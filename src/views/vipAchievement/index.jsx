import React, { Component } from 'react'
import { post } from '../../store/requestFacade'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { Link } from 'react-router-dom'

class vipAchievement extends Component {
  constructor() {
    super()
    this.state = {
      monthActivateRewards: '',
      repayTotalTransaction: {},
      receiptTotalTransaction: {}
    }
    this.LinkTo = this.LinkTo.bind(this)
  }
  LinkTo() {
    this.props.history.push({
      pathname: 'returnsDetailed',
      query: {
        type: '1'
      }
    })
    // console.log(this.props.history);
  }
  tofinishTist() {
    window.getLoadData.finishTist()
  }
  async getPartnerAchievement() {
    try {
      const res = await post({
        url: 'onLinePartner/index'
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
  render() {
    return (
      <div>
        <header>
          <div className="head" style={{ backgroundColor: '#fff' }}>
            <div className="toback-b" onClick={this.tofinishTist} />
            <h2 style={{ color: '#000' }}>VIP业绩</h2>
          </div>
        </header>
        <ul className="performanceList">
          <li className="vipRepay">
            <Link
              to={{
                pathname: '/quickRepay',
                state: { tradeType: 4 }
              }}
              style={{ color: '#ffc778' }}
            >
              <dl className="monlyTransactionAmount">
                <dt>本月还款总交易量(元)</dt>
                <dd>{this.state.repayTotalTransaction.sumTradeAmt}</dd>
              </dl>
              {/* <div className="reachAchievement">
                <dl>
                  <dt>达成亿元(人)</dt>
                  <dd>
                    {this.state.repayTotalTransaction.hundredOfMillionPeoples}
                  </dd>
                </dl>
                <div className="columnLine" />
                <dl>
                  <dt>达成两千万(人)</dt>
                  <dd>{this.state.repayTotalTransaction.twentyMillionPeoples}</dd>
                </dl>
              </div> */}
            </Link>
          </li>
          <li className="vipReceipt">
            <Link
              to={{
                pathname: '/quickReceipt',
                state: { tradeType: 3 }
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
          <li className="vipReward" onClick={this.LinkTo}>
            {/* <Link to='/returnsDetailed'> */}
            <dl className="monlyTransactionAmount" style={{ color: ' #ffc778' }}>
              <dt>本月推广奖励收益 (元)</dt>
              <dd>{this.state.monthActivateRewards}</dd>
            </dl>
            {/* </Link> */}
          </li>
        </ul>
      </div>
    )
  }
}
export default vipAchievement
