'use strict'

export const resolutionOptions = [
  {w: 640, h: 360},
  {w: 969, h: 392},
  {w: 768, h: 432},
  {w: 852, h: 480},
  {w: 960, h: 540},
  {w: 1096, h: 616},
  {w: 1152, h: 648},
  {w: 1280, h: 720},
  {w: 1140, h: 810},
  {w: 1536, h: 864},
  {w: 1600, h: 900},
  {w: 1920, h: 1080}
]
resolutionOptions.forEach((res) => res.value = `${res.w}x${res.h}`)

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
    return <div className={this.props.className}>
      <label htmlFor='resolution'>Resolution</label>{' '}
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
      {' '}
      <input
        type='range'
        id='resolution-slider'
        name='resolution-slider'
        min={0}
        max={resolutionOptions.length-1}
        step='1'
        value={resolutionOptions.indexOf(this.props.value)}
        onChange={this.changedSlider.bind(this)}
        disabled={this.props.disabled}
        >
      </input>
    </div>
  }
}
