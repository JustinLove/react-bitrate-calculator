import {BitrateCalculator} from "./BitrateCalculator.js"
import {ChatStatus} from "./ChatStatus.js"
import * as ChatBot from "./ChatBot.js"
import {store} from './store.js'

'use strict'

export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <BitrateCalculator />
      <ChatStatus />
    </div>
  }
}

ChatBot.connectToChat(store.getState().chatbot, store)

let Provider = ReactRedux.Provider

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>, reactRoot)
