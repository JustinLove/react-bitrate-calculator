import {BitrateCalculator} from "./BitrateCalculator.jsx"
import * as React from 'react'

'use strict'

export class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <BitrateCalculator />
      <p>
        BPP: Bits Per Pixel. <a href="https://docs.google.com/spreadsheets/d/1Vm0_8BQGNxKcowK5RwTgiqQisR4mVblbWvl-N4A-lDM/edit#gid=0">0.1 is generally recommended</a> for streaming, perhaps 0.6 for low motions streams.
      </p>
      <p>
        BPI: Bits Per Inch. My own unit, that takes into account display size on my monitor. I find my settings of choice are 5-9.
      </p>
    </div>
  }
}
