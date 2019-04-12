import {clientId} from "./TwitchId.js"
import {resolutionOptions} from "./ResolutionControl.js"

'use strict'

export class ChatBot extends React.Component {
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
    console.log(arguments)
    if (self) return

    const commandName = msg.trim()

    let match

    if (commandName == '!bitrate') {
      this.client.say(target, `current bitrate is set at ${this.props.bitrate}`)
    } else if (match = commandName.match(/!bpp (\d+)p(\d+) (\d+)/)) {
      const [_, inputHeight, inputFramerate, inputBitrate] = match
      console.log(inputHeight, inputFramerate, inputBitrate)

      const res = resolutionOptions.find(res => res.h == inputHeight)
      if (!res) {
        this.client.say(target, "resolution height not found")
        return
      }

      const framerate = parseInt(inputFramerate, 10)
      if (isNaN(framerate)) {
        this.client.say(target, "could not parse framerate")
        return
      }

      const bitrate = parseInt(inputBitrate, 10)
      if (isNaN(bitrate)) {
        this.client.say(target, "could not parse bitrate")
        return
      }

      this.props.onChangeSettings({
        target: 'bpp',
        bitrate: bitrate,
        resolution: res,
        framerate: framerate,
      })
      setTimeout(this.reportCurrentSettings.bind(this), 1000)
    } else {
      console.log('unknown command')
    }
  }

  onChatConnected(addr, port) {
    this.setState({addr: addr, port: port})
  }

  connectedStatus() {
    return <p>{this.state.addr}:{this.state.port}</p>
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
      this.defaultStatus()
    } else {
      this.loginLink()
    }
  }

  render() {
    return <div>
      <h2>ChatBot</h2>
      {this.statusText()}
    </div>
  }
}
