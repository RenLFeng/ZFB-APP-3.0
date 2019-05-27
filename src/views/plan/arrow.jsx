import React, { Component } from 'react'

export class Arrow extends Component {
  render() {
    if (this.props.expand) {
      return (
        <img
          alt=""
          style={{ width: '0.13rem', height: '0.07rem', marginTop: '0.03rem' }}
          src={require('./assets/arrow_right.png')}
        />
      )
    }
    return (
      <img
        alt=""
        style={{ width: '0.07rem', height: '0.13rem', marginLeft: '0.03rem' }}
        src={require('./assets/arrow_down.png')}
      />
    )
  }
}
