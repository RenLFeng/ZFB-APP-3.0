import React, { Component } from 'react'
import '../../assets/css/partnerPerformance.css'
import '../../assets/css/common.css'
import SettlementRules from './settlementRules'
import { Link } from 'react-router-dom'
class teamAchievement extends Component {
  constructor (props) {
    super(props)
    this.state ={
      sendShow:false,
    }
  }
  
  popRules () {
    this.setState({
      sendShow:true
    })
  }
  getHide () {
    this.setState({
      sendShow:false
    })
  }
  getTitle () {
    if( this.props.teamTrade.tradeType === 1) {
      return '本月合伙人团队收款交易量 (元)'
      
    }
    if( this.props.teamTrade.tradeType === 2) {
      return  '本月合伙人团队还款交易量 (元)'
    }
  }
  render () {
    return (
      <div style={{width:'100%',height:'100%'}}>
        <div className="totalTransaction">
          <Link to={{
            pathname:'/teamAchievementList',
            state:{tradeType:this.props.teamTrade.tradeType}
          }}>
            <div className="tradingVolume"> 
              <p>{this.getTitle()}</p>
              <strong>{this.props.teamTrade.partnerIndexSubEntity.sumTradeAmt}</strong>
              <div className="excellentPerson">
                <p><span style={{fontSize:'.12rem'}}>达成亿元 (人)：</span>{this.props.teamTrade.partnerIndexSubEntity.hundredOfMillionPeoples}</p>
                <div style={{width:'1px',height:'.15rem',backgroundColor:'#4288ff'}}></div>
                <div><span style={{fontSize:'.12rem'}}>达成两千万 (人)：</span>{this.props.teamTrade.partnerIndexSubEntity.twentyMillionPeoples}</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="achievementReward">
          <div className="rewards">
            <Link to={{
              pathname:'/historyAchievement',
              state:{tradeType:this.props.teamTrade.tradeType}
            }}>
              <div className="historyAchievement">
                <p>业绩奖励</p>
                <p>历史业绩</p>
              </div>
            </Link>
            <ul className="fourReward">
              <li style={{borderRight:'1px solid #e5e5e5',borderBottom:'1px solid #e5e5e5'}}>
                <dl style={{paddingTop:'.14rem'}}>
                  <dt className='dividedReward'>分润奖励</dt>
                  <dd>{this.props.teamTrade.rewards.profitRreward}元</dd>
                </dl>
              </li>
              <li style={{borderBottom:'1px solid #e5e5e5',paddingLeft:'.12rem'}}>
                <dl style={{paddingTop:'.14rem'}}>
                  <dt className='manageReward'>管理奖励</dt>
                  <dd>{this.props.teamTrade.rewards.manageReward}元</dd>
                </dl>
              </li>
              <li style={{borderRight:'1px solid #e5e5e5',paddingTop:'.38rem'}}>
                <dl>
                  <dt className='excellentReward'>卓越奖励</dt>
                  <dd>{this.props.teamTrade.rewards.excellentReward}元</dd>
                </dl>
              </li>
              <li style={{paddingTop:'.38rem'}}>
                <dl style={{paddingLeft:'.12rem'}}>
                  <dt className='gloryReward'>荣耀奖励</dt>
                  <dd>{this.props.teamTrade.rewards.honourReward}元</dd>
                </dl>
              </li>
            </ul>
            <p className='settlementRules' ><span onClick={ () => this.popRules()}>结算规则</span></p>   
          </div>
        </div>
        <SettlementRules show={this.state.sendShow} getHide={() => {this.getHide()}}/>
      </div> 
    )
  }
}
export default teamAchievement