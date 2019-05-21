import * as React from 'react'
import {DimensionControl} from './DimensionControl.jsx'

'use strict'

export class BitrateControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedBitrate(e) {
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    const bitrate = parseInt(e.target.value, 10)
    if (!isNaN(bitrate)) {
      this.props.onChange(bitrate*1000)
      return
    }
  }

  render() {
    return <DimensionControl
        className={this.props.className}
        dimension='bitrate'
        dimensionName='Bitrate'
        min='0'
        max='6000'
        step='1'
        value={this.props.value/1000}
        onChange={this.changedBitrate.bind(this)}
        disabled={this.props.disabled}
        >
        <input
          type='number'
          id='bitrate'
          name='bitrate'
          value={this.props.value/1000}
          onChange={this.changedBitrate.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
      </DimensionControl>
  }
}
