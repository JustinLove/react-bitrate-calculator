'use strict'

const e = React.createElement

var resolutionOptions = [
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
resolutionOptions.forEach(function(res) { res.value = `${res.w}x${res.h}`})

var framerateOptions = [10, 15, 20, 30, 45, 60]

var calculateBpp = function(state) {
  return state.bitrate * 1000 / (state.resolution.w * state.resolution.h * state.framerate)
}

export class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bitrate: props.bitrate || 1200,
      resolution: props.resolution || resolutionOptions[0],
      framerate: props.framerate || 30,
    }
    this.state.bpp = calculateBpp(this.state)
  }

  changedBitrate(e) {
    if (e.target.value == '') {
      this.setState({bitrate: ''})
      return
    }
    var bitrate = parseInt(e.target.value, 10)
    if (!isNaN(bitrate)) {
      this.setState((prevState) => {
        prevState.bitrate = bitrate
        return {bitrate: bitrate, bpp: calculateBpp(prevState)}
      })
      return
    }
  }

  changedResolution(e) {
    var res = resolutionOptions.find(function(res) {return res.value == e.target.value})
    if (res) {
      this.setState((prevState) => {
        prevState.resolution = res
        return {resolution: res, bpp: calculateBpp(prevState)}
      })
    }
  }

  changedFramerate(e) {
    if (e.target.value == '') {
      this.setState({framerate: ''})
      return
    }
    var framerate = parseInt(e.target.value, 10)
    if (!isNaN(framerate)) {
      this.setState((prevState) => {
        prevState.framerate = framerate
        return {framerate: framerate, bpp: calculateBpp(prevState)}
      })
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
            ...resolutionOptions.map(function(res) {
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
            ...framerateOptions.map(function(fps) {
              return e('option', {value: fps}, fps)
            })
          )
        ),
        e('div', {},
          e('label', { htmlFor: 'bpp' }, 'bpp '),
          e('input', {
              type: 'number',
              id: 'bpp',
              name: 'bpp',
              value: this.state.bpp.toFixed(3),
              readOnly: true,
            }
          ),
        )
      )
    )
  }
}
