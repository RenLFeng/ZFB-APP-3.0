import React, { Component } from 'react'
import { post } from '../../store/requestFacade'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { Link } from 'react-router-dom'

class PartnerPerformance extends Component {
  constructor() {
    super()
    this.state = {
      monthActivateRewards: '',
      repayTotalTransaction: {},
      receiptTotalTransaction: {}
    }
  }
  tofinishTist() {
    window.getLoadData.finishTist()
  }
  async getPartnerAchievement() {
    try {
      const res = await post({
        url: 'partner/index'
      })
      this.setState({
        monthActivateRewards: res.data.monthActivateRewards,
        repayTotalTransaction: res.data.proxyEntity,
        receiptTotalTransaction: res.data.quickEntity
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.getPartnerAchievement()
  }
    handleItemsGoBack = () => {
    this.props.history.push({
      pathname: 'myAccount'
    })
  }
  render() {
    return (
      <div>
        <header>
          <div className="head" style={{ backgroundColor: '#fff' }}>
            <div className="toback-b" onClick={this.tofinishTist} />
            <h2 style={{ color: '#000' }}>合伙人业绩</h2>
          </div>
        </header>
        <ul className="performanceList">
          <li className="repayPerformance">
            <Link
              to={{
                pathname: '/deviceRepay',
                state: { tradeType: 2 }
              }}
              style={{ color: '#458cff' }}
            >
              <dl className="monlyTransactionAmount">
                <dt>本月还款总交易量(元)</dt>
                <dd>{this.state.repayTotalTransaction.sumTradeAmt}</dd>
              </dl>
              {/* <div className="reachAchievement">
                <dl>
                  <dt>达成亿元(人)</dt>
                  <dd>{this.state.repayTotalTransaction.hundredOfMillionPeoples}</dd>
                </dl>
                <div className="columnLine" />
                <dl>
                  <dt>达成两千万(人)</dt>
                  <dd>{this.state.repayTotalTransaction.twentyMillionPeoples}</dd>
                </dl>
              </div> */}
            </Link>
          </li>
          <li className="receiptPerformance">
            <Link
              to={{
                pathname: '/deviceReceipt',
                state: { tradeType: 1 }
              }}
              style={{ color: '#fff' }}
            >
              <dl className="monlyTransactionAmount">
                <dt>本月收款总交易量(元)</dt>
                <dd>{this.state.receiptTotalTransaction.sumTradeAmt}</dd>
              </dl>
              {/* <div className="reachAchievement">
                <dl>
                  <dt>达成亿元(人)</dt>
                  <dd>{this.state.receiptTotalTransaction.hundredOfMillionPeoples}</dd>
                </dl>
                <div className="columnLine" />
                <dl>
                  <dt>达成两千万(人)</dt>
                  <dd>{this.state.receiptTotalTransaction.twentyMillionPeoples}</dd>
                </dl>
              </div> */}
            </Link>
          </li>
          {/* <li className="activeReward" onClick={this.LinkTo}>
            <Link
              to={{
                pathname: '/returnsDetailed',
                search: '?type=3'
              }}
            >
              <dl className="monlyTransactionAmount" style={{ color: ' #458cff' }}>
                <dt>本月激活奖励收益(元)</dt>
                <dd>{this.state.monthActivateRewards}</dd>
              </dl>
            </Link>
          </li> */}

          <li className="activeReward" onClick={this.LinkTo}>
            <Link
              to={{
                pathname: '/AccountDetails',
                query: {
                  type: "ActivationBonus",
                  title: "激活奖励",
                  goback: this.handleItemsGoBack,
                  api: "/profit/reward",
                  statisticsType: 1
                }
              }}
            >
              <dl className="monlyTransactionAmount" style={{ color: ' #458cff' }}>
                <dt>本月激活奖励收益(元)</dt>
                <dd>{this.state.monthActivateRewards}</dd>
              </dl>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
export default PartnerPerformance
