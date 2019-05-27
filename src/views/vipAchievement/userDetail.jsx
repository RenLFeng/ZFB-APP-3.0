import React, { Component } from 'react'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
class userDetail extends Component {
  constructor () {
    super()
    this.state = {
      userDetailData:''
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  async getuserDetail () {
    try{
      const res = await post({
        url:'onLineMonthresults/merchantInfo',
        data:{
          organId:this.props.location.state.organId,
          organType:this.props.location.state.organType
        }
      })
      this.setState({
        userDetailData:res.data
      })
    }catch(err) {
      console.log(err)
    }
  } 
  judgeRepayAmount () {
    console.log(this.state.userDetailData.repaymentIsMust)
    if(this.state.userDetailData.repaymentIsMust === 1 ) {
      return 'achievetwentyMillon'
    }
    else if(this.state.userDetailData.repaymentIsBillion === 1 ) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  judgeReceiptAmount() {
    if(this.state.userDetailData.receivablesIsMust === 1) {
      return 'achievetwentyMillon'
    }
    else if (this.state.userDetailData.receivablesIsBillion === 1) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  componentDidMount () {
    this.getuserDetail()
  }
  render () {
    console.log(this.props)
    return (
      <div style={{position:'relative',height:'100%',width:'100%'}}>
        <header style={{height:'1.4rem'}}>
          <div className="head">
            <div className="toback" onClick={ () => {this.backPrevious()}} />
            <h2>用户详情</h2>
          </div>
        </header> 
        <div className="userAchievementDetailWrap">
          <div className="userInfo" style={{display:'flex',alignItems:'center'}}>
            <img src={require('../../assets/img/tx.png')} alt=""/>
            <div className="userMsg">
              <span>{this.state.userDetailData.username}</span>
              <span className="userAddress">{this.state.userDetailData.detAddress}</span>
              <p className="userId">{this.state.userDetailData.idCard}</p>
            </div>
          </div>
          <div className="userAchievementDetailContent">
            <div className={this.judgeRepayAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.userDetailData.repaymentAmtMonth)}</dt>
                <dd>本月还款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.userDetailData.allRepaymentAmt)}</dt>
                <dd>累计还款交易量 (元)</dd>
              </dl>
            </div>
            <div className={this.judgeReceiptAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.userDetailData.receivablesAmtMonth)}</dt>
                <dd>本月收款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.userDetailData.allReceivablesAmt)}</dt>
                <dd>累计收款交易量 (元)</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default userDetail