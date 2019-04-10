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

  changedBpp(bpp) {
    this.setState((prevState) => {
      return {bpp: bpp}
    })
  }

  changedTarget(e) {
    var target = e.target.value
    this.setState((prevState) => {
      return {target: target, bpp: calculateBpp(prevState)}
    })
  }

  radio(target) {
    return <input
      type='radio'
      name='target'
      id={'target-' + target}
      value={target}
      checked={this.state.target == target}
      onChange={this.changedTarget.bind(this)}
      >
    </input>
  }

  render() {
    return <div>
      <h1>Bitrate Calculator</h1>
      <form>
        <div>
          {this.radio('bitrate')}
          <BitrateControl
              value={this.state.bitrate}
              onChange={this.changedBitrate.bind(this)}
              className='target-control'
              >
          </BitrateControl>
        </div>
        <div>
          {this.radio('resolution')}
          <ResolutionControl
              value={this.state.resolution}
              onChange={this.changedResolution.bind(this)}
              className='target-control'
              >
          </ResolutionControl>
        </div>
        <div>
          {this.radio('framerate')}
          <FramerateControl
              value={this.state.framerate}
              onChange={this.changedFramerate.bind(this)}
              className='target-control'
              >
          </FramerateControl>
        </div>
        <div>
          {this.radio('bpp')}
          <BppControl
              value={this.state.bpp}
              onChange={this.changedBpp.bind(this)}
              className='target-control'
              >
          </BppControl>
        </div>
      </form>
    </div>
  }
}
