import React, { Component } from 'react'
import { Arrow } from './arrow'
import { PLAN_STATUS } from '../../core/plan/display'

import url from '././assets/fail.png'
export class PausedInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { expand: false }
  }

  render() {
    if (
      this.props.status !== PLAN_STATUS.PAUSED &&
      this.props.status !== PLAN_STATUS.FAILED
    ) {
      return <div />
    }
    return (
      <div
        className="pause-info"
        onClick={() => {
          this.setState({ expand: !this.state.expand })
        }}
      >
        <div className="head">
          <img className="icon" src={url} alt="" />
          <div className="reason">{this.props.pauseReason}</div>
          <div className="arrow-container">
            <Arrow expand={this.state.expand} />
          </div>
        </div>
        <div style={{ clear: 'both' }} />
        {(() => {
          if (this.state.expand) {
            return <div className="sms">{this.props.pauseSms}</div>
          }
        })()}
      </div>
    )
  }
}
