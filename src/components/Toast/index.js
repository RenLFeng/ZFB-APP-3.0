import React, { Component } from 'react'
import css from './index.module.scss'

export default class Toast extends Component {
  state = {
    hidden: false
  }
  componentDidMount() {
    const { time } = this.props
    this.timerID = setTimeout(() => this.disappear(), Number(time) * 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  disappear = () => {
    this.setState({
      hidden: true
    })
  }

  render() {
    const { hidden } = this.state
    const { news } = this.props
    const CSSOBJ = {
      display: hidden ? 'none' : 'block'
    }
    return (
      <div style={CSSOBJ} className={css.Toast}>
        {news}
      </div>
    )
  }
}

Toast.default = {
  time: 1.5
}
