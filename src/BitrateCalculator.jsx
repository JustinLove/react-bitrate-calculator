import * as Calc from './Calculator.js'
import {BitrateControl} from './BitrateControl.js'
import {ResolutionControl} from './ResolutionControl.js'
import {FramerateControl} from './FramerateControl.js'
import {BppControl} from './BppControl.js'
import {ChatBot} from './ChatBot.js'

'use strict'

const optimize = function(state) {
  switch (state.target) {
    case 'bitrate': return {bitrate: Calc.calculateBitrate(state)}
    case 'resolution': return {resolution: Calc.calculateResolution(state)}
    case 'framerate': return {framerate: Calc.calculateFramerate(state)}
    case 'bpp': return {bpp: Calc.calculateBpp(state)}
    default: console.warn('unknown optimize target'); return {}
  }
}

export class BitrateCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bitrate: props.bitrate || 1200,
      resolution: props.resolution || Calc.resolutionOptions[0],
      framerate: props.framerate || 30,
      target: 'bpp',
    }
    this.state.bpp = Calc.calculateBpp(this.state)
  }

  changedSettings(settings) {
    this.setState((prevState) => {
      return Object.assign(settings, optimize(Object.assign(prevState, settings)))
    })
  }

  changedBitrate(bitrate) {
    this.changedSettings({bitrate})
  }

  changedResolution(resolution) {
    this.changedSettings({resolution})
  }

  changedFramerate(framerate) {
    this.changedSettings({framerate})
  }

  changedBpp(bpp) {
    this.changedSettings({bpp})
  }

  changedTarget(e) {
    this.changedSettings({target: e.target.value})
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
      <ChatBot
        username="wondibot"
        oauthToken={this.props.oauthToken}
        channel="wondible"
        onChangeSettings={this.changedSettings.bind(this)}
        onChangeTarget={this.changedTarget.bind(this)}
        bitrate={this.state.bitrate}
        onChangeBitrate={this.changedBitrate.bind(this)}
        resolution={this.state.resolution}
        onChangeResolution={this.changedResolution.bind(this)}
        framerate={this.state.framerate}
        onChangeFramerate={this.changedFramerate.bind(this)}
        bpp={this.state.bpp}
      />
    </div>
  }
}
