import React, { Component } from 'react'
import '../../../assets/css/particulars.css'
import { post } from '../../../store/requestFacade'
import { cutAmount } from '../../../store/filter'

export default class AllEarnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadData: []
    }
  }
  componentDidMount() {
    this.loadData()
  }
  async loadData() {
    try {
      const res = await post({
        url: 'profit/reward',
        data: {
          type: this.props.type
        }
      })
      this.setState({
        loadData: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  profitType(type) {
    const statuMap = {
      1: '激活奖励',
      3: '平台购机'
    }
    return statuMap[type]
  }

  render() {
    return (
      <div>
        {this.state.loadData.map((item, index) => {
          return (
            <div className="particulars" key={index}>
              <p className="subTitle">{this.profitType(item.profitType)}</p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>收益金额</span>
                <span>{cutAmount(item.profitAmt)}元</span>
              </p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>收益时间</span>
                <span>{item.profitTime}</span>
              </p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>收益来源</span>
                <span>{item.profitSource}</span>
              </p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>订单号</span>
                <span>{item.tradeNo}</span>
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}
