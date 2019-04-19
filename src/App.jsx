import {BitrateCalculator} from "./BitrateCalculator.js"
import {ChatStatus} from "./ChatStatus.js"
import * as React from './react.js'

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
