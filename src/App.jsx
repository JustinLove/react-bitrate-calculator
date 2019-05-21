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
        BPI: Bits Per Inch. My own unit, that takes into account display size on my monitor. Attempt to account for higher resolution streams getting away with lower BPP. I find my settings of choice are 5-9.
      </p>
      <footer>
        <a href="https://github.com/JustinLove/react-bitrate-calculator">
          <svg className="icon icon-github"><use xlinkHref="symbol-defs.svg#icon-github"/></svg> react-bitrate-calculator
        </a>
        {" "}
        <a href="https://twitter.com/wondible">
          <svg className="icon icon-twitter"><use xlinkHref="symbol-defs.svg#icon-twitter"/></svg> wondible
        </a>
        {" "}
        <a href="https://twitch.tv/wondible">
          <svg className="icon icon-twitch"><use xlinkHref="symbol-defs.svg#icon-twitch"/></svg> wondible
        </a>
      </footer>
    </div>
  }
}
