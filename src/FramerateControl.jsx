'use strict'

var framerateOptions = [10, 15, 20, 30, 45, 60]

export class FramerateControl extends React.Component {
  constructor(props) {
    super(props)
  }

  changedFramerate(e) {
    if (e.target.value == '') {
      this.props.onChange('')
      return
    }
    var framerate = parseInt(e.target.value, 10)
    if (!isNaN(framerate)) {
      this.props.onChange(framerate)
      return
    }
  }

  changedSlider(e) {
    this.props.onChange(framerateOptions[e.target.value])
  }

  render() {
    return <div className={this.props.className}>
      <label htmlFor='framerate'>Framerate</label>{' '}
      <select
        id='framerate'
        name='framerate'
        value={this.props.value}
        onChange={this.changedFramerate.bind(this)}
        disabled={this.props.disabled}
        >
        {framerateOptions.map(function(fps) {
          return <option value={fps} key={fps.toString()}>{fps}</option>
        })}
      </select>
      {' '}
      <input
        type='range'
        id='framerate-slider'
        name='framerate-slider'
        min={0}
        max={framerateOptions.length-1}
        step='1'
        value={framerateOptions.indexOf(this.props.value)}
        onChange={this.changedSlider.bind(this)}
        disabled={this.props.disabled}
        >
      </input>
    </div>
  }
}
