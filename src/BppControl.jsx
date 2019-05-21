import * as React from 'react'

'use strict'

export class BppControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stringValue: this.props.value.toFixed(3) }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.disabled) {
      return { stringValue: props.value.toFixed(3) }
    }
    return null
  }

  changedStringValue(e) {
    this.setState({stringValue: e.target.value})
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    const bpp = parseFloat(e.target.value)
    if (!isNaN(bpp)) {
      this.props.onChange(bpp)
      return
    }
  }

  render() {
    return <div className={this.props.className}>
      <label className='dimension' htmlFor='bpp'>BPP</label>{' '}
      <input
        type='text'
        id='bpp'
        className='data'
        name='bpp'
        value={this.state.stringValue}
        onChange={this.changedStringValue.bind(this)}
        disabled={this.props.disabled}
        >
      </input>
      {' '}
      <label>0.05</label>
      {' '}
      <input
        type='range'
        id='bpp-slider'
        name='bpp-slider'
        min='0.05'
        max='0.5'
        step='0.01'
        value={this.state.stringValue}
        onChange={this.changedStringValue.bind(this)}
        disabled={this.props.disabled}
        >
      </input>
      {' '}
      <label>0.5</label>
    </div>
  }
}
