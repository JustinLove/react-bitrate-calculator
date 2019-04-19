import {BitrateCalculator} from "./BitrateCalculator.jsx"
import {ChatStatus} from "./ChatStatus.jsx"
import * as React from 'react'

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
