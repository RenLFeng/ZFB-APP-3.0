import React, { Component } from 'react'
import { post } from '../../store/requestFacade'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import TeamAchievement from './teamAchievement'
import PersonalAchievement from './personalAchievement'
import css from './deviceRepay.module.scss'

class deviceRepay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      types: ['团队业绩', '个人业绩'],
      teamTrade: {
        tradeType: '',
        partnerIndexSubEntity: '',
        merchantSumTradeAmt: '',
        rewards: ''
      }
    }
  }
  typesNav(index) {
    return index === this.state.current ? 'types-tab active' : 'types-tab'
  }
  typesCon(index) {
    return index === this.state.current ? 'typesCon active' : 'typesCon'
  }
  getTypesIndex(index) {
    this.setState({
      current: index
    })
  }
  backPrevious() {
    this.props.history.push({
      pathname: 'partnerPerformance'
    })
  }
  // 团队业绩
  async getRepayTeamInfo() {
    try {
      const res = await post({
        url: 'partner/getTradeDetail',
        data: {
          tradeType: 2
        }
      })
      this.setState({
        teamTrade: {
          tradeType: this.props.location.state.tradeType,
          partnerIndexSubEntity: res.data.partnerIndexSubEntity,
          merchantSumTradeAmt: res.data.merchantSumTradeAmt,
          rewards: res.data.rewards
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  async componentWillMount() {
    this.getRepayTeamInfo()
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
        <header>
          <div className="head" style={{ backgroundColor: ' #4288ff' }}>
            <div
              className="toback"
              onClick={() => {
                this.backPrevious()
              }}
            />
            <h2>设备还款</h2>
          </div>
        </header>
        <div className={css.achievementWrap}>
          <div className="achievementHead">
            <ul className="types-title">
              {this.state.types.map((ele, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => this.getTypesIndex(index)}
                    className={this.typesNav(index)}
                  >
                    {ele}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={this.typesCon(0)}>
            <TeamAchievement teamTrade={this.state.teamTrade} />
          </div>
          <div className={this.typesCon(1)}>
            <PersonalAchievement teamTrade={this.state.teamTrade} />
          </div>
        </div>
      </div>
    )
  }
}
export default deviceRepay
