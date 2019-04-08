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

  render() {
    return <div>
      <label htmlFor='framerate'>Framerate</label>{' '}
      <select
        id='framerate'
        name='framerate'
        value={this.props.value}
        onChange={this.changedFramerate.bind(this)}
        >
        {framerateOptions.map(function(fps) {
          return <option value={fps} key={fps.toString()}>{fps}</option>
        })}
      </select>
    </div>
  }
}
