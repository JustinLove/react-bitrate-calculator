import {BitrateControl} from './BitrateControl.js'
import {ResolutionControl, resolutionOptions} from './ResolutionControl.js'
import {FramerateControl} from './FramerateControl.js'
import {BppControl} from './BppControl.js'

'use strict'

const calculateBitrate = function({resolution: {w, h}, framerate, bpp}) {
  return w * h * framerate * bpp / 1000
}

const calculateBpp = function({bitrate, resolution: {w, h}, framerate}) {
  return bitrate * 1000 / (w * h * framerate)
}

const optimize = function(state) {
  switch (state.target) {
    case 'bitrate': return {bitrate: calculateBitrate(state)}
    case 'bpp': return {bpp: calculateBpp(state)}
    default: console.warn('unknown optimize target'); return {}
  }
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
      return Object.assign({bitrate}, optimize(prevState))
    })
  }

  changedResolution(resolution) {
    this.setState((prevState) => {
      prevState.resolution = resolution
      return Object.assign({resolution}, optimize(prevState))
    })
  }

  changedFramerate(framerate) {
    this.setState((prevState) => {
      prevState.framerate = framerate
      return Object.assign({framerate}, optimize(prevState))
    })
  }

  changedBpp(bpp) {
    this.setState((prevState) => {
      prevState.bpp = bpp
      return Object.assign({bpp}, optimize(prevState))
    })
  }

  changedTarget(e) {
    const target = e.target.value
    this.setState((prevState) => {
      prevState.target = target
      return Object.assign({target}, optimize(prevState))
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
              disabled={this.state.target == 'bitrate'}
              className='target-control'
              >
          </BitrateControl>
        </div>
        <div>
          {this.radio('resolution')}
          <ResolutionControl
              value={this.state.resolution}
              onChange={this.changedResolution.bind(this)}
              disabled={this.state.target == 'resolution'}
              className='target-control'
              >
          </ResolutionControl>
        </div>
        <div>
          {this.radio('framerate')}
          <FramerateControl
              value={this.state.framerate}
              onChange={this.changedFramerate.bind(this)}
              disabled={this.state.target == 'framerate'}
              className='target-control'
              >
          </FramerateControl>
        </div>
        <div>
          {this.radio('bpp')}
          <BppControl
              value={this.state.bpp}
              onChange={this.changedBpp.bind(this)}
              disabled={this.state.target == 'bpp'}
              className='target-control'
              >
          </BppControl>
        </div>
      </form>
    </div>
  }
}
