import {clientId} from "./TwitchId.js"

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

  onChatMessage(target, context, msg, self) {
    console.log(arguments)
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
