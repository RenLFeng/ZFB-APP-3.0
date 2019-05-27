import React, { Component } from 'react'
import '../../../assets/css/equipment.css'
import Earnings from './Earnings'
// import RepayEarnings from "./repayEarnings";
// import PayEarnings from "./payEarnings";

export default class EquipmentEarnings extends Component {
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
  componentDidMount () {
    if(this.props.status) {
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
            <li onClick={() => { this.setState({ current: 0 }) }}className={this.tabNav(0)}>
              全部
            </li>
            <li onClick={() => { this.setState({ current: 1 }) }}className={this.tabNav(1)}>
            还款分润
            </li>
            <li onClick={() => { this.setState({ current: 2 }) }}className={this.tabNav(2)}>
              收款分润
            </li>
          </ul>
        </div>
        <div className="equipmenttab-item">
          <div className={this.TabContent(0)}>
            <Earnings type={0} />
          </div>
          <div className={this.TabContent(2)}>
            <Earnings type={2} />
          </div>
          <div className={this.TabContent(1)}>
            <Earnings type={1} />
          </div>
        </div>
      </div>
    )
  }
}
