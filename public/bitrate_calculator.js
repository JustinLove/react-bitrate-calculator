'use strict'

const e = React.createElement

var resolutions = [
  {w: 640, h: 360},
  {w: 969, h: 392},
  {w: 768, h: 432},
  {w: 852, h: 480},
  {w: 960, h: 540},
  {w: 1096, h: 616},
  {w: 1152, h: 648},
  {w: 1280, h: 720},
  {w: 1140, h: 810},
  {w: 1536, h: 864},
  {w: 1600, h: 900},
  {w: 1920, h: 1080}
]
resolutions.forEach(function(res) { res.value = `${res.w}x${res.h}`})

export class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bitrate: props.bitrate || 1200,
      resolution: props.resolution || resolutions[0],
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
    var i = resolutions.find(function(res) {res.value == e.target.value})
    if (i >= 0) {
      this.setState({resolution: resolutions[i]})
    }
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
              value: this.state.resolution.value,
              onChange: this.changedResolution.bind(this),
            },
            ...resolutions.map(function(res) {
              return e('option', {value: res.value}, res.value)
            })
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
