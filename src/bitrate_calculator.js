import {BitrateControl} from './BitrateControl.js'

'use strict'

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

  changedBitrate(bitrate) {
    this.setState((prevState) => {
      prevState.bitrate = bitrate
      return {bitrate: bitrate, bpp: calculateBpp(prevState)}
    })
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
    return <div>
      <h1>Bitrate Calculator</h1>
      <form>
        <BitrateControl
            value={this.state.bitrate}
            onChange={this.changedBitrate.bind(this)}
            >
        </BitrateControl>
        <div>
          <label htmlFor='resolution'>Resolution</label>{' '}
          <select
            id='resolution'
            name='resolution'
            value={this.state.resolution.value}
            onChange={this.changedResolution.bind(this)}
            >
            {resolutionOptions.map(function(res) {
              return <option value={res.value} key={res.value}>{res.value}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor='framerate'>Framerate</label>{' '}
          <select
            id='framerate'
            name='framerate'
            value={this.state.framerate}
            onChange={this.changedFramerate.bind(this)}
            >
            {framerateOptions.map(function(fps) {
              return <option value={fps} key={fps.toString()}>{fps}</option>
            })}
          </select>
        </div>
        <div>
          <label htmlFor='bpp'>bpp</label>{' '}
          <input
            type='number'
            id='bpp'
            name='bpp'
            value={this.state.bpp.toFixed(3)}
            readOnly={true}
            >
          </input>
        </div>
      </form>
    </div>
  }
}
