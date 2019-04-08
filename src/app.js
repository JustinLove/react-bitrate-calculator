import {BitrateCalculator} from "./bitrate_calculator.js"

'use strict'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <BitrateCalculator/>
  }
}

const reactRoot = document.querySelector('#react-root')
ReactDOM.render(React.createElement(App), reactRoot)
