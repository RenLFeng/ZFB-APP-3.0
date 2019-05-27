import React, { Component } from 'react'
import '../../../assets/css/common.css'
import ActivateEarnings from './ActivateEarnings'

export default class ActivityEarnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }
  }
  tabNav (index) {
    return index === this.state.current
      ? 'equipmenttab result'
      : 'equipmenttab'
  }
  TabContent (index) {
    return index === this.state.current
      ? 'equipmenttab-content result'
      : 'equipmenttab-content'
  }
  componentDidMount() {
    if (this.props.status) {
      this.setState({
        current: this.props.status
      })
    }
  }
  render() {
    return (
      <div className="equipment">
        <div className="equipmentinfo">
          <ul className="equipmentTab">
            <li
              onClick={() => {
                this.setState({ current: 0 })
              }}
              className={this.tabNav(0)}
            >
              全部
            </li>
            <li
              onClick={() => {
                this.setState({ current: 1 })
              }}
              className={this.tabNav(1)}
            >
              平台购机
            </li>
            <li
              onClick={() => {
                this.setState({ current: 2 })
              }}
              className={this.tabNav(2)}
            >
              激活奖励
            </li>
            {false && (
              <li
                onClick={() => {
                  this.setState({ current: 3 })
                }}
                className={this.tabNav(3)}
              >
                推广奖励
              </li>
            )}
          </ul>
        </div>
        <div className="equipmenttab-item">
          <div className={this.TabContent(0)}>
            <ActivateEarnings type={0} />
          </div>
          <div className={this.TabContent(1)}>
            <ActivateEarnings type={3} />
          </div>
          <div className={this.TabContent(2)}>
            <ActivateEarnings type={1} />
          </div>
          <div className={this.TabContent(3)}>
            <ActivateEarnings type={2} />
          </div>
        </div>
      </div>
    )
  }
}
