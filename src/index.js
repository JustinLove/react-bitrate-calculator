import {App} from "./App.jsx"
import {store} from './store.js'
import * as React from 'react'
import * as ReactRedux from 'react-redux'
import * as ReactDOM from 'react-dom'

'use strict'

let Provider = ReactRedux.Provider

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(<Provider store={store}>
  <App />
  </Provider>, reactRoot)
