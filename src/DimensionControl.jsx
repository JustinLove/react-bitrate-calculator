import * as React from 'react'

'use strict'

export class DimensionControl extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className={this.props.className}>
        <label className="dimension" htmlFor={this.props.dimension}>{this.props.dimensionName}</label>{' '}
        <div className="data">
          {this.props.children}
        </div>
        {' '}
        {this.props.labels ?
          <label className="min">{this.props.min}</label> :
          <span className="min"></span>}
        {' '}
        <input
          type='range'
          id={this.props.dimension+'-slider'}
          name={this.props.dimension+'-slider'}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          value={this.props.value}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
          >
        </input>
        {' '}
        {this.props.labels ? <label className="max">{this.props.max}</label> : ""}
      </div>
  }
}
