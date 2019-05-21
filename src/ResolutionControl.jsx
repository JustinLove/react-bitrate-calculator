import {resolutionOptions} from './Calculator.js'
import {DimensionControl} from './DimensionControl.jsx'
import * as React from 'react'

'use strict'

export class ResolutionControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedResolution(e) {
    const res = resolutionOptions.find(res => res.value == e.target.value)
    if (res) {
      this.props.onChange(res)
    }
  }

  changedSlider(e) {
    this.props.onChange(resolutionOptions[e.target.value])
  }

  render() {
    return <DimensionControl
        className={this.props.className}
        dimension='resolution'
        dimensionName='Resolution'
        min={0}
        max={resolutionOptions.length-1}
        step='1'
        value={resolutionOptions.indexOf(this.props.value)}
        onChange={this.changedSlider.bind(this)}
        disabled={this.props.disabled}
        >
        <select
          id='resolution'
          name='resolution'
          value={this.props.value.value}
          onChange={this.changedResolution.bind(this)}
          disabled={this.props.disabled}
          >
          {resolutionOptions.map(res =>
            <option value={res.value} key={res.value}>{res.value}</option>
          )}
        </select>
      </DimensionControl>
  }
}
