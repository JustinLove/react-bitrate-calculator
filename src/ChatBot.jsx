import {clientId} from "./TwitchId.js"
import * as Calc from "./Calculator.js"
import * as actions from './actions.js'

'use strict'

class ChatBot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addr: null,
      port: null,
    }
  }

  authorizeUrl(redirectUri) {
    return "https://api.twitch.tv/kraken/oauth2/authorize?"
      + [
          "client_id=" + encodeURIComponent(clientId),
          "redirect_uri=" + encodeURIComponent(redirectUri),
          "response_type=token",
          "scope=chat:read+chat:edit",
        ].join('&')
  }

  componentDidMount() {
    console.log('mounted')
    if (this.props.username && this.props.oauthToken && this.props.channel) {
      let opts = {
        options: {
          clientId: clientId,
          //debug: true,
        },
        identity: {
          username: this.props.username,
          password: this.props.oauthToken,
        },
        channels: [ this.props.channel ],
      }
      console.log('creating client')
      this.client = new tmi.client(opts)
      this.client.on('message', this.onChatMessage.bind(this))
      this.client.on('connected', this.onChatConnected.bind(this))
      this.client.connect()
    }
  }

  componentWillUnmount() {
    this.client.disconnect()
    this.client = null
    this.setState({addr: null, port: null})
  }

  reportCurrentSettings() {
    if (this.client) {
      this.client.say(`#${this.props.channel}`, `${this.props.resolution.value}p${this.props.framerate} at ${this.props.bitrate}kbps ${this.props.bpp.toFixed(3)}bpp`)
    }
  }

  onChatMessage(target, context, msg, self) {
    //console.log(arguments)
    if (self) return

    const commandName = msg.trim()

    let match

    if (commandName == '!bitrate') {
      this.client.say(target, `current bitrate is set at ${this.props.bitrate}`)
    } else if (commandName.startsWith('!calc')) {
      let [_, ...parts] = commandName.split(' ')

      let settings = {}

      parts.forEach(s => {
        let match
        if (match = s.match(/(\d+)p(\d+)/)) {
          const [_, inputHeight, inputFramerate] = match

          settings.resolution = Calc.resolutionOptions.find(res => res.h == inputHeight)
          if (!settings.resolution) {
            this.client.say(target, "resolution height not found")
            return
          }

          settings.framerate = parseInt(inputFramerate, 10)
          if (isNaN(settings.framerate)) {
            this.client.say(target, "could not parse framerate")
            return
          }
        } else if (match = s.match(/(\d+)x(\d+)/)) {
          const input = match[0]

          settings.resolution = Calc.resolutionOptions.find(res => res.value == input)
          if (!settings.resolution) {
            this.client.say(target, "resolution not found")
            return
          }
        } else if (parseInt(s) == 0) {
          settings.bpp = parseFloat(s)
        } else if (!isNaN(parseInt(s))) {
          const value = parseInt(s)
          if (value <= 144) {
            settings.framerate = value
          } else {
            settings.bitrate = value
          }
        } else {
          this.client.say(target, "unrecognized parameter " + s)
        }
      })

      if (settings.bitrate == null
        && settings.resolution
        && settings.framerate
        && settings.bpp) {
        settings.target = 'bitrate'
        this.client.say(target, `${Calc.calculateBitrate(settings)}kbps`)
      } else if (settings.bitrate
        && settings.resolution == null
        && settings.framerate
        && settings.bpp) {
        settings.target = 'resolution'
        const res = Calc.calculateResolution(settings)
        this.client.say(target, `${res.w}x${res.h}`)
      } else if (settings.bitrate
        && settings.resolution
        && settings.framerate == null
        && settings.bpp) {
        settings.target = 'framerate'
        this.client.say(target, `${Calc.calculateFramerate(settings)} fps`)
      } else if (settings.bitrate
        && settings.resolution
        && settings.framerate
        && settings.bpp == null) {
        settings.target = 'bpp'
        this.client.say(target, `${Calc.calculateBpp(settings).toFixed(3)} bpp`)
      }

      this.props.setSettings(settings)
    } else {
      //console.log('unknown command')
    }
  }

  onChatConnected(addr, port) {
    this.setState({addr: addr, port: port})
  }

  connectedStatus() {
    return <div>
      <p>{this.state.addr}:{this.state.port}</p>
      <button onClick={this.reportCurrentSettings.bind(this)}>Post to chat</button>
    </div>
  }

  defaultStatus() {
    return <p>Logged in</p>
  }

  loginLink() {
    return <a href={this.authorizeUrl(window.location.origin + window.location.pathname)}>Login</a>
  }

  statusText() {
    if (this.state.addr) {
      return this.connectedStatus()
    } else if (this.props.oauthToken) {
      return this.defaultStatus()
    } else {
      return this.loginLink()
    }
  }

  render() {
    return <div>
      <h2>ChatBot</h2>
      {this.statusText()}
    </div>
  }
}

const mapStateToProps = state => {
  return state.calculator
}

const {setSettings} = actions;

const cb = ReactRedux.connect(
  mapStateToProps,
  {setSettings}
)(ChatBot)
export {cb as ChatBot}
