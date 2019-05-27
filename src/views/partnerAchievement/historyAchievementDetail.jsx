import React, { Component } from 'react'
import '../../assets/css/partnerPerformance.css'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
class historyAchievementDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      monthlyAmount:'',
      rewardAmount:'',
      achievementDetailData:''
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  fmtDate(arg) {
    const date = new Date(arg)
    const y = date.getFullYear()
    const m = date.getMonth()+1
    return y+ '-' + m
  }
  async getAchievementDetail () {
    try {
      const res = await post ({
        url:'partner/getTradeDetailInfo',
        data:{
          tradeType:this.props.location.state.tradeType,
          addDate:this.props.location.state.date
        }
      })
      this.setState({
        monthlyAmount:res.data.sumAmt,
        rewardAmount:res.data.Sum,
        achievementDetailData:res.data.data
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    this.getAchievementDetail()
  }
  render () {
    return (
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',    backgroundColor: '#f1f1f1'}}>
        <header>
          <div className="head" style={{backgroundColor:'#fff'}}>
            <div className="toback-b" onClick={this.backPrevious.bind(this)} />
            <h2 style={{color:'#000'}}>业绩详情</h2>
          </div>
        </header>
        <div className="settleMonth">结算月份 {this.fmtDate(this.props.location.state.date)}</div>
        <div >
          <div className="rewards">
            <div className="historyAchievement">
              <div>月度业绩</div>
              <div>{cutAmount(this.state.monthlyAmount)}元</div>
            </div>
            <ul className="fourReward">
              <li style={{borderRight:'1px solid #e5e5e5',borderBottom:'1px solid #e5e5e5'}}>
                <dl style={{paddingTop:'.14rem'}}>
                  <dt className='dividedReward'>分润奖励</dt>
                  <dd>{cutAmount(this.state.achievementDetailData.profitReward)}元</dd>
                </dl>
              </li>
              <li style={{borderBottom:'1px solid #e5e5e5',paddingLeft:'.12rem'}}>
                <dl style={{paddingTop:'.14rem'}}>
                  <dt className='manageReward'>管理奖励</dt>
                  <dd>{cutAmount(this.state.achievementDetailData.manageReward)}元</dd>
                </dl>
              </li>
              <li style={{borderRight:'1px solid #e5e5e5',paddingTop:'.38rem'}}>
                <dl>
                  <dt className='excellentReward'>卓越奖励</dt>
                  <dd>{cutAmount(this.state.achievementDetailData.brilliantReward)}元</dd>
                </dl>
              </li>
              <li style={{paddingTop:'.38rem'}}>
                <dl style={{paddingLeft:'.12rem'}}>
                  <dt className='gloryReward'>荣耀奖励</dt>
                  <dd>{cutAmount(this.state.achievementDetailData.honourReward)}元</dd>
                </dl>
              </li>
            </ul>
            <div className="currentMonthReward">
              <p>业绩奖励</p>
              <p>{cutAmount(this.state.rewardAmount)}元</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default historyAchievementDetail