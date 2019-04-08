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
      target: 'bpp',
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

  changedTarget(e) {
    var target = e.target.value
    this.setState((prevState) => {
      return {target: target, bpp: calculateBpp(prevState)}
    })
  }

  render() {
    return <div>
      <h1>Bitrate Calculator</h1>
      <form>
        <div>
          <input
            type='radio'
            name='target'
            id='target-bitrate'
            value='bitrate'
            checked={this.state.target == 'bitrate'}
            onChange={this.changedTarget.bind(this)}
            >
          </input>
          <BitrateControl
              value={this.state.bitrate}
              onChange={this.changedBitrate.bind(this)}
              className='target-control'
              >
          </BitrateControl>
        </div>
        <div>
          <input
            type='radio'
            name='target'
            id='target-resolution'
            value='resolution'
            checked={this.state.target == 'resolution'}
            onChange={this.changedTarget.bind(this)}
            >
          </input>
          <ResolutionControl
              value={this.state.resolution}
              onChange={this.changedResolution.bind(this)}
              className='target-control'
              >
          </ResolutionControl>
        </div>
        <div>
          <input
            type='radio'
            name='target'
            id='target-framerate'
            value='framerate'
            checked={this.state.target == 'framerate'}
            onChange={this.changedTarget.bind(this)}
            >
          </input>
          <FramerateControl
              value={this.state.framerate}
              onChange={this.changedFramerate.bind(this)}
              className='target-control'
              >
          </FramerateControl>
        </div>
        <div>
          <input
            type='radio'
            name='target'
            id='target-bpp'
            value='bpp'
            checked={this.state.target == 'bpp'}
            onChange={this.changedTarget.bind(this)}
            >
          </input>
          <BppControl
              value={this.state.bpp}
              className='target-control'
              >
          </BppControl>
        </div>
      </form>
    </div>
  }
}
