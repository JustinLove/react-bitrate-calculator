import {App} from "./App.js"
import * as ChatBot from "./ChatBot.js"
import {store} from './store.js'
import * as React from './react.js'
import * as ReactRedux from './react-redux.js'
import * as ReactDOM from './react-dom.js'

'use strict'

ChatBot.connectToChat(store.getState().chatbot, store)

let Provider = ReactRedux.Provider

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>, reactRoot)
