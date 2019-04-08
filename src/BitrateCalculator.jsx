import {BitrateControl} from './BitrateControl.js'
import {ResolutionControl, resolutionOptions} from './ResolutionControl.js'
import {FramerateControl} from './FramerateControl.js'
import {BppControl} from './BppControl.js'

'use strict'

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

  changedResolution(res) {
    this.setState((prevState) => {
      prevState.resolution = res
      return {resolution: res, bpp: calculateBpp(prevState)}
    })
  }

  changedFramerate(framerate) {
    this.setState((prevState) => {
      prevState.framerate = framerate
      return {framerate: framerate, bpp: calculateBpp(prevState)}
    })
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
        <ResolutionControl
            value={this.state.resolution}
            onChange={this.changedResolution.bind(this)}
            >
        </ResolutionControl>
        <FramerateControl
            value={this.state.framerate}
            onChange={this.changedFramerate.bind(this)}
            >
        </FramerateControl>
        <BppControl
            value={this.state.bpp}
            >
        </BppControl>
      </form>
    </div>
  }
}
