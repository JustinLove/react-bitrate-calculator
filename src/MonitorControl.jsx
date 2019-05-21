import * as React from 'react'
import {DimensionControl} from './DimensionControl.jsx'

'use strict'

export class MonitorControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedMonitor(e) {
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    const bpi = parseInt(e.target.value)
    if (!isNaN(bpi)) {
      this.props.onChange(bpi)
      return
    }
  }

  render() {
    return <DimensionControl
        className={this.props.className}
        dimension='monitor'
        dimensionName='Monitor "'
        min='2'
        max='50'
        step='1'
        labels="true"
        value={this.props.value}
        onChange={this.changedMonitor.bind(this)}
        disabled={this.props.disabled}
        >
        <input
          type='number'
          id='monitor'
          name='monitor'
          value={this.props.value}
          onChange={this.changedMonitor.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
      </DimensionControl>
  }
}
