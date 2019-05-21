import * as React from 'react'
import {DimensionControl} from './DimensionControl.jsx'

'use strict'

export class BpiControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedBpi(e) {
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    const bpi = parseFloat(e.target.value)
    if (!isNaN(bpi)) {
      this.props.onChange(bpi)
      return
    }
  }

  render() {
    return <DimensionControl
        className={this.props.className}
        dimension='bpi'
        dimensionName='BPI'
        min='0'
        max='20'
        step='1'
        value={this.props.value}
        onChange={this.changedBpi.bind(this)}
        disabled={this.props.disabled}
        >
        <input
          type='number'
          id='bpi'
          name='bpi'
          value={this.props.value.toFixed(1)}
          onChange={this.changedBpi.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
      </DimensionControl>
  }
}
