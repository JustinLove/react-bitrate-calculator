'use strict'

const e = React.createElement

export class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bitrate: props.bitrate || 1200,
      resolution: props.resolution || "853x480",
      framerate: props.framerate || 30,
      bpp: 0.1,
    }
  }

  changedBitrate(e) {
    if (e.target.value == '') {
      this.setState({bitrate: ''})
      return
    }
    var bitrate = parseInt(e.target.value, 10)
    if (!isNaN(bitrate)) {
      this.setState({bitrate: bitrate})
      return
    }
  }

  changedResolution(e) {
    this.setState({resolution: e.target.value})
  }

  changedFramerate(e) {
    if (e.target.value == '') {
      this.setState({framerate: ''})
      return
    }
    var framerate = parseInt(e.target.value, 10)
    if (!isNaN(framerate)) {
      this.setState({framerate: framerate})
      return
    }
  }

  render() {
    return e('div', {},
      e('h1', {}, 'Bitrate Calculator'),
      e('form', {},
        e('div', {},
          e('label', { htmlFor: 'bitrate' }, 'Bitrate '),
          e('input', {
              type: 'number',
              id: 'bitrate',
              name: 'bitrate',
              value: this.state.bitrate,
              onChange: this.changedBitrate.bind(this),
            }
          ),
        ),
        e('div', {},
          e('label', { htmlFor: 'resolution' }, 'Resolution '),
          e('select', {
              id: 'resolution',
              name: 'resolution',
              value: this.state.resolution,
              onChange: this.changedResolution.bind(this),
            },
            e('option', { value: '640x360'}, '640x360'),
            e('option', { value: '852x480'}, '852x480')
          )
        ),
        e('div', {},
          e('label', { htmlFor: 'framerate' }, 'framerate '),
          e('select', {
              id: 'framerate',
              name: 'framerate',
              value: this.state.framerate,
              onChange: this.changedFramerate.bind(this),
            },
            e('option', { value: '10'}, '10'),
            e('option', { value: '30'}, '30')
          )
        ),
        e('div', {},
          e('label', { htmlFor: 'bpp' }, 'bpp '),
          e('input', {
              type: 'number',
              id: 'bpp',
              name: 'bpp',
              value: this.state.bpp,
              readOnly: true,
            }
          ),
        )
      )
    )
  }
}
