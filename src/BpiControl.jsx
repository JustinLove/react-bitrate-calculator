import * as React from 'react'

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
    return <div className={this.props.className}>
        <label htmlFor='bpi'>BPI</label>{' '}
        <input
          type='number'
          id='bpi'
          name='bpi'
          value={this.props.value.toFixed(1)}
          onChange={this.changedBpi.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
        {' '}
        <label>0</label>
        {' '}
        <input
          type='range'
          id='bpi-slider'
          name='bpi-slider'
          max='20'
          step='1'
          value={this.props.value}
          onChange={this.changedBpi.bind(this)}
          disabled={this.props.disabled}
          >
        </input>
        {' '}
        <label>20</label>
      </div>
  }
}
