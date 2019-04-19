import {clientId} from "./TwitchId.js"
import * as Calc from "./Calculator.js"
import * as actions from './actions.js'
import * as ChatBot from './ChatBot.js'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

'use strict'

class ChatStatus extends React.Component {
  constructor(props) {
    super(props)
  }

  connectedStatus() {
    return <div>
      <p>{this.props.addr}:{this.props.port}</p>
      <button onClick={this.props.reportCurrentSettings.bind(this)}>Post to chat</button>
    </div>
  }

  defaultStatus() {
    return <p>Logged in</p>
  }

  loginLink() {
    return <a href={ChatBot.authorizeUrl(window.location.origin + window.location.pathname)}>Login</a>
  }

  statusText() {
    if (this.props.addr) {
      return this.connectedStatus()
    } else if (this.props.oauthToken) {
      return this.defaultStatus()
    } else {
      return this.loginLink()
    }
  }

  render() {
    return <div>
      <h2>Chat Status</h2>
      {this.statusText()}
    </div>
  }
}

const mapStateToProps = state => {
  return state.chatbot
}

let {reportCurrentSettings} = actions

const cb = ReactRedux.connect(
  mapStateToProps,
  {reportCurrentSettings}
)(ChatStatus)
export {cb as ChatStatus}
