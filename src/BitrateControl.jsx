import * as React from './react.js'

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
      this.props.onChange(bitrate)
      return
    }
  }

  render() {
    return <div className={this.props.className}>
        <label htmlFor='bitrate'>Bitrate</label>{' '}
        <input
          type='number'
          id='bitrate'
          name='bitrate'
          value={this.props.value}
          onChange={this.changedBitrate.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
        {' '}
        <label>0</label>
        {' '}
        <input
          type='range'
          id='bitrate-slider'
          name='bitrate-slider'
          max='6000'
          step='1'
          value={this.props.value}
          onChange={this.changedBitrate.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
        {' '}
        <label>6000</label>
      </div>
  }
}
