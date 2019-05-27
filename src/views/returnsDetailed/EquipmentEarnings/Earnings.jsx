import React, { Component } from 'react'
import '../../../assets/css/particulars.css'
import { post } from '../../../store/requestFacade'
import { cutAmount } from '../../../store/filter'

export default class AllEarnings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allData: []
    }
  }
  async getAlldata() {
    try {
      const res = await post({
        url: 'profit/deviceEarnings',
        data: {
          type: this.props.type
        }
      })
      this.setState({
        allData: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async componentDidMount() {
    await this.getAlldata()
  }
  profitType(type) {
    const statuMap = {
      2: '还款',
      1: '收款'
    }
    return statuMap[type]
  }
  orderType(type) {
    const statuMap = {
      2: '订单号',
      1: '任务订单'
    }
    return statuMap[type]
  }
  profitSettlement(type) {
    const statuMap = {
      1: '日结',
      2: '月结'
    }
    return statuMap[type]
  }
  profitMonth(month) {
    if (month === null || '') return ''
    return String(month).slice(0, 10)
  }

  profitSettleData(item) {
    const statuMap = {
      1: (
        <p className="subDetail">
          <span style={{ color: '#999999' }}>收益来源</span>
          <span>{item.profitSource}</span>
        </p>
      ),
      2: (
        <p className="subDetail">
          <span style={{ color: '#999999' }}>结算月份</span>
          <span>{this.profitMonth(item.profitMonth)}</span>
        </p>
      )
    }
    return statuMap[item.profitSettlement]
  }
  render() {
    const { allData } = this.state
    return (
      <div>
        {allData.map((item, index) => {
          return (
            <div className="particulars" key={index}>
              <p className="subTitle">
                {this.profitType(item.profitType)} -{' '}
                {this.profitSettlement(item.profitSettlement)}
              </p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>收益金额</span>
                <span>{cutAmount(item.profitAmt)}元</span>
              </p>
              <p className="subDetail">
                <span style={{ color: '#999999' }}>收益时间</span>
                <span>{item.profitTime}</span>
              </p>
              {this.profitSettleData(item)}
              <p className="subDetail">
                <span style={{ color: '#999999' }}>{this.orderType(item.profitSettlement)}</span>
                <span>{item.tradeNo}</span>
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}
