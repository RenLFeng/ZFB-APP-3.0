import React, { Component } from 'react'
import '../../assets/css/partnerPerformance.css'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import {post} from '../../store/requestFacade'
import { Link } from 'react-router-dom'
import {fmtDate} from '../../store/fmtDate'
import bg from '../../assets/img/no-achievement.png'
import { cutAmount } from '../../store/filter'
class historyAchievement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isAchievement:false,
      rewardNum:'',
      rewardSum:'',
      historyAchievementData:[]
    }
  }
  async getHistoryAchievement () {
    try{
      const res = await post ({
        url:'partner/getTradeDetailHistory',
        data:{
          tradeType:this.props.location.state.tradeType
        }
      })
      this.setState({
        rewardNum:res.data.tradeDetailHistoryCount,
        rewardSum:res.data.Sum,
        historyAchievementData:res.data.data
      })
      if(res.data.data.length === 0 ) {
        this.setState({
          isAchievement:true
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  cutlast (index) {
    if( index + 1 === this.state.historyAchievementData.length) {
      return 'rankHide'
    }
  }
  getNew (index) {
    if( index === 0 ) {
      return 'newTime'
    }
  }
  getBottomInfo () {
    if(this.props.location.state.tradeType === 1) {
      return '仅显示半年的设备收款业绩'
    }
    if(this.props.location.state.tradeType === 2) {
      return '仅显示半年的设备还款业绩'
    }
    if(this.props.location.state.tradeType === 3) {
      return '仅显示半年的快捷收款业绩'
    }
    if(this.props.location.state.tradeType === 4) {
      return '仅显示半年的快捷还款业绩'
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  componentDidMount () {
    this.getHistoryAchievement()
  }
  render () {
    return (
      <div  style={{width:'100%',height:
            '100%'}}>
        {
          this.state.isAchievement?
            (
              <div>
                <header>
                  <div className="head" style={{backgroundColor:'#fff'}}>
                    <div className="toback-b" onClick={() =>{this.backPrevious()} } />
                    <h2 style={{color:'#000',borderBottom:'1px solid #e5e5e5'}}>历史业绩</h2>
                  </div>
                </header>
                <div style={noAchievementBg}>
                  <p style={{position:'relative',textAlign:'center',top:'3.14rem',fontSize:'.13rem',color:'#666'}}>暂无历史业绩</p>
                </div>
              </div>
            ) :
            (
              <div  style={{width:'100%',height:
            '100%',display:'flex',flexDirection:'column'}}>
                <header style={{height:'1.06rem',width:'3.75REM'}}>
                  <div className="head" style={{ backgroundColor: ' #4288ff' }}>
                    <div className="toback" onClick={this.backPrevious.bind(this)}  />
                    <h2>历史业绩</h2>
                  </div>
                </header>
                <div className='historyAchievementWrap'>
                  <div className="historyContent">
                    <div className="achievementPreview">
                      <dl>
                        <dt>奖励次数</dt>
                        <dd>{this.state.rewardNum}次</dd>
                      </dl>
                      <dl>
                        <div style={{width:'1px',height:'.4rem',backgroundColor:'#e5e5e5',margin:'auto'}}></div>
                      </dl>
                      <dl>
                        <dt>累计奖励金额</dt>
                        <dd>{cutAmount(this.state.rewardSum)}元</dd>
                      </dl>
                    </div>
                    <div className="achievementList">
                      <div className="lines">
                        {
                          this.state.historyAchievementData.map( (ele, index) => {
                            return (
                              <div className={this.cutlast(index)} key={ele.month}>
                                <div></div>
                              </div>
                            )
                          })
                        }
                      </div>
                      <ul>
                        {
                          this.state.historyAchievementData.map( (ele, index) => {
                            return (
                              <Link to={{
                                pathname:'/historyAchievementDetail',
                                state:{
                                  tradeType:this.props.location.state.tradeType,
                                  date:ele.month
                                }
                              }} key={index}>
                                <li className='perMonthAchievement'>
                                  <p className={this.getNew(index)}>{fmtDate(ele.month)}</p>
                                  <p className='montlyAmount'>{cutAmount(ele.sum)}元</p>
                                </li>
                              </Link>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <div className='historyNote'>{this.getBottomInfo()}</div>
                  </div>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}
const noAchievementBg = {
  background:'url(' + bg + ') no-repeat center 1.44rem',
  backgroundSize:'2.45rem 1.8rem',
  width:'100%',
  height:'6.02rem'
}
export default historyAchievement