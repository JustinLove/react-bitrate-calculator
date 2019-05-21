import {framerateOptions} from './Calculator.js'
import {DimensionControl} from './DimensionControl.jsx'
import * as React from 'react'

'use strict'

export class FramerateControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedFramerate(e) {
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    const framerate = parseInt(e.target.value, 10)
    if (!isNaN(framerate)) {
      this.props.onChange(framerate)
      return
    }
  }

  changedSlider(e) {
    this.props.onChange(framerateOptions[e.target.value])
  }

  render() {
    return <DimensionControl
        className={this.props.className}
        dimension='framerate'
        dimensionName='Framerate'
        min={0}
        max={framerateOptions.length-1}
        step='1'
        value={framerateOptions.indexOf(this.props.value)}
        onChange={this.changedSlider.bind(this)}
        disabled={this.props.disabled}
        >
        <select
          id='framerate'
          name='framerate'
          value={this.props.value}
          onChange={this.changedFramerate.bind(this)}
          disabled={this.props.disabled}
          >
          {framerateOptions.map(fps =>
            <option value={fps} key={fps.toString()}>{fps}</option>
          )}
        </select>
      </DimensionControl>
  }
}
