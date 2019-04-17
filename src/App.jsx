import {BitrateCalculator} from "./BitrateCalculator.js"
import {ChatStatus} from "./ChatStatus.js"
import {store} from './store.js'

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
      <BitrateCalculator />
      <ChatStatus
        username="wondibot"
        oauthToken={this.state.oauthToken}
        channel="wondible"
      />
    </div>
  }
}

let Provider = ReactRedux.Provider

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>, reactRoot)
