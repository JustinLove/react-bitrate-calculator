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
    var bpp = parseFloat(e.target.value)
    if (!isNaN(bpp)) {
      this.props.onChange(bpp)
      return
    }
  }

  render() {
    return <div className={this.props.className}>
      <label htmlFor='bpp'>BPP</label>{' '}
      <input
        type='text'
        id='bpp'
        name='bpp'
        value={this.state.stringValue}
        onChange={this.changedStringValue.bind(this)}
        disabled={this.props.disabled}
        >
      </input>
    </div>
  }
}
