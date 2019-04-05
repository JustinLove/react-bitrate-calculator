'use strict'

const e = React.createElement

export class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return e('h1', {}, "Bitrate Calculator")
  }
}
