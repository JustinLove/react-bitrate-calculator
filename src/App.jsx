import {BitrateCalculator} from "./BitrateCalculator.js"
import {ChatBot} from "./ChatBot.js"

'use strict'

export class App extends React.Component {
  constructor(props) {
    super(props)
    let match = window.location.hash.match(/access_token=([^&]+)&/)
    this.state = {
      oauthToken: match && match[1],
    }
  }

  render() {
    return <div>
      <BitrateCalculator/>
      <ChatBot
        username="wondibot"
        oauthToken={this.state.oauthToken}
        channel="wondible"
      />
    </div>
  }
}

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(React.createElement(App), reactRoot)
