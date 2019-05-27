import React, { Component } from 'react'
import { post } from '../../store/requestFacade'
import { parseURL } from '../../store/URL'

export default class withdrawDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withdrawId: '',
      WithdrawDetail: []
    }
  }
  goBack() {
    this.props.history.push({
      pathname: `myAccount`
    })
  }
  getwithrawId = () => {
    const urlData = this.props.location.search
    if (urlData) {
      this.setState({ withdrawId: parseURL(urlData).withdrawId })
    }
    if (this.props.history.location.withdrawId) {
      this.setState({ withdrawId: this.props.history.location.withdrawId })
    }
  }
  getWithdrawDetail = async () => {
    try {
      const res = await post({
        url: 'wallet/withdraw/detail',
        data: {
          withdrawId: this.state.withdrawId
        }
      })
      this.setState({
        WithdrawDetail: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async componentWillMount() {
    await this.getwithrawId()
    this.getWithdrawDetail()
  }

  cutDate(date) {
    return date.slice(5, date.length)
  }
  styleStatus(status) {
    if (status === 0 || status === 2) {
      return (
        <ul>
          <li className="apply">
            <dl>
              <dt />
              <dd className="step" style={textSuccess}>
                提现申请
              </dd>
              <dd className="time" style={{ color: '#4288ff' }}>
                {this.cutDate(this.state.WithdrawDetail.addDate)}
              </dd>
            </dl>
          </li>
          <li className="process-bar1" />
          <li className="process">
            <dl>
              <dt />
              <dd className="step" style={textEarning}>
                平台处理中
              </dd>
            </dl>
          </li>
          <li className="process-bar2" />
          <li className="arrival">
            <dl>
              <dt />
              <dd className="step">成功到账</dd>
              <dd />
            </dl>
          </li>
        </ul>
      )
    }
    if (status === 1 || status === 4) {
      return (
        <ul>
          <li className="apply">
            <dl>
              <dt />
              <dd className="step" style={textSuccess}>
                提现申请
              </dd>
              <dd className="time" style={{ color: '#4288ff' }}>
                {this.cutDate(this.state.WithdrawDetail.addDate)}
              </dd>
            </dl>
          </li>
          <li className="process-bar1" />
          <li className="processErr">
            <dl>
              <dt />
              <dd className="step" style={textError}>
                提现失败
              </dd>
              <dd className="time" style={{ color: '#fc4e4e' }}>
                {this.cutDate(this.state.WithdrawDetail.editDate)}
              </dd>
            </dl>
          </li>
          <li className="process-bar2" />
          <li className="arrival">
            <dl>
              <dt />
              <dd className="step">成功到账</dd>
              <dd />
            </dl>
          </li>
        </ul>
      )
    }
    if (status === 3) {
      return (
        <ul>
          <li className="apply">
            <dl>
              <dt />
              <dd className="step" style={textSuccess}>
                提现申请
              </dd>
              <dd className="time" style={{ color: '#4288ff' }}>
                {this.cutDate(this.state.WithdrawDetail.addDate)}
              </dd>
            </dl>
          </li>
          <li className="process-bar1" />
          <li className="processSuc">
            <dl>
              <dt />
              <dd className="step" style={textSuccess}>
                平台处理中
              </dd>
              <dd className="time" style={{ color: '#4288ff' }}>
                {this.cutDate(this.state.WithdrawDetail.editDate)}
              </dd>
            </dl>
          </li>
          <li className="process-bar1" />
          <li className="arrivalSuc">
            <dl>
              <dt />
              <dd className="step" style={textSuccess}>
                成功到账
              </dd>
              <dd className="time" style={{ color: '#4288ff' }}>
                {this.cutDate(this.state.WithdrawDetail.endDate)}
              </dd>
            </dl>
          </li>
        </ul>
      )
    }
  }
  infoStatus(status) {
    if (status === 1 || status === 4) {
      return (
        <div className="withdrawal-msg">
          <div>
            <p>到账银行卡</p>
            <p>{this.state.WithdrawDetail.bankCard}</p>
          </div>
          <div>
            <p>提现金额</p>
            <p>{this.state.WithdrawDetail.withdrawAmt}元</p>
          </div>
          <div>
            <p>手续费</p>
            <p>{this.state.WithdrawDetail.fee}元</p>
          </div>
          <div>
            <p>备注</p>
            <p style={{ color: '#fc4e4e' }}>{this.state.WithdrawDetail.msg}</p>
          </div>
        </div>
      )
    } else {
      return (
        <div className="withdrawal-msg">
          <div>
            <p>到账银行卡</p>
            <p>{this.state.WithdrawDetail.bankCard}</p>
          </div>
          <div>
            <p>提现金额</p>
            <p>{this.state.WithdrawDetail.withdrawAmt}元</p>
          </div>
          <div>
            <p>手续费</p>
            <p>{this.state.WithdrawDetail.fee}元</p>
          </div>
          <div>
            <p>到账金额</p>
            <p>{this.state.WithdrawDetail.arrivalAmt}元</p>
          </div>
          <div>
            <p>交易单号</p>
            <p>{this.state.WithdrawDetail.withdrawId}</p>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        <header>
          <div className="head">
            <div className="toback-b" onClick={this.goBack.bind(this)} />
            <h2 style={{ backgroundColor: '#fff', color: '#000' }}>提现详情</h2>
          </div>
        </header>
        <div className="process-situation">
          {this.styleStatus(this.state.WithdrawDetail.status)}
        </div>
        {this.infoStatus(this.state.WithdrawDetail.status)}
      </div>
    )
  }
}
const textSuccess = {
  color: '#4288ff',
  padding: '.16rem 0 .04rem',
  fontSize: '.14rem'
}
const textError = {
  color: '#fc4e4e',
  padding: '.16rem 0 .04rem',
  fontSize: '.14rem'
}
const textEarning = {
  color: '#ffb44c',
  padding: '.16rem 0 .04rem',
  fontSize: '.14rem'
}
