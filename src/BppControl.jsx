'use strict'

export class BppControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <label htmlFor='bpp'>BPP</label>{' '}
      <input
        type='number'
        id='bpp'
        name='bpp'
        value={this.props.value.toFixed(3)}
        readOnly={true}
        >
      </input>
    </div>
  }
}
