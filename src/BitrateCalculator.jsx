import * as Calc from './Calculator.js'
import * as actions from './actions.js'
import {BitrateControl} from './BitrateControl.jsx'
import {ResolutionControl} from './ResolutionControl.jsx'
import {FramerateControl} from './FramerateControl.jsx'
import {BppControl} from './BppControl.jsx'
import {BpiControl} from './BpiControl.jsx'
import * as ReactRedux from 'react-redux'
import * as React from 'react'

'use strict'

class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
  }

  changedBitrate(bitrate) {
    this.props.setBitrate(bitrate)
  }

  changedResolution(resolution) {
    this.props.setResolution(resolution)
  }

  changedFramerate(framerate) {
    this.props.setFramerate(framerate)
  }

  changedBpp(bpp) {
    this.props.setBpp(bpp)
  }

  changedBpi(bpi) {
    this.props.setBpi(bpi)
  }

  changedTarget(e) {
    this.props.setTarget(e.target.value)
  }

  radio(target) {
    return <span className='target-select'>
      <input
        type='radio'
        name='target'
        id={'target-' + target}
        className='target-select'
        value={target}
        checked={this.props.target == target}
        onChange={this.changedTarget.bind(this)}
        >
      </input>
    </span>
  }

  render() {
    return <div>
      <h1>Bitrate Calculator</h1>
      <form>
        <div>
          {this.radio('bitrate')}
          <BitrateControl
              value={this.props.bitrate}
              onChange={this.changedBitrate.bind(this)}
              disabled={this.props.target == 'bitrate'}
              className='target-control'
              >
          </BitrateControl>
        </div>
        <div>
          {this.radio('resolution')}
          <ResolutionControl
              value={this.props.resolution}
              onChange={this.changedResolution.bind(this)}
              disabled={this.props.target == 'resolution'}
              className='target-control'
              >
          </ResolutionControl>
        </div>
        <div>
          {this.radio('framerate')}
          <FramerateControl
              value={this.props.framerate}
              onChange={this.changedFramerate.bind(this)}
              disabled={this.props.target == 'framerate'}
              className='target-control'
              >
          </FramerateControl>
        </div>
        <div>
          {this.radio('bpp')}
          <BppControl
              value={this.props.bpp}
              onChange={this.changedBpp.bind(this)}
              disabled={this.props.target == 'bpp'}
              className='target-control'
              >
          </BppControl>
        </div>
        <div>
          <span className="target-select"></span>
          <BpiControl
              value={this.props.bpi}
              onChange={this.changedBpi.bind(this)}
              disabled={true}
              className='target-control'
              >
          </BpiControl>
        </div>
      </form>
    </div>
  }
}

const mapStateToProps = state => {
  return state.calculator
}

const bc = ReactRedux.connect(
  mapStateToProps,
  actions
)(BitrateCalculator)
export {bc as BitrateCalculator}
