import React, { Component } from 'react'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
class merchantDetail extends Component {
  constructor () {
    super()
    this.state = {
      merchantDetailData:''
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  async getmerchantDetail () {
    try{
      const res = await post({
        url:'monthresults/merchantInfo',
        data:{
          organId:this.props.location.state.organId,
          organType:this.props.location.state.organType
        }
      })
      if(res.data) {
        this.setState({
          merchantDetailData:res.data
        })
      }
    }catch(err) {
      console.log(err)
    }
  } 
  judgeRepayAmount () {
    console.log(this.state.merchantDetailData.repaymentIsMust)
    if(this.state.merchantDetailData.repaymentIsMust === 1 ) {
      return 'achievetwentyMillon'
    }
    else if(this.state.merchantDetailData.repaymentIsBillion === 1 ) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  judgeReceiptAmount() {
    if(this.state.merchantDetailData.receivablesIsMust === 1) {
      return 'achievetwentyMillon'
    }
    else if (this.state.merchantDetailData.receivablesIsBillion === 1) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  componentDidMount () {
    this.getmerchantDetail()
  }
  render () {
    console.log(this.props)
    return (
      <div style={{position:'relative',height:'100%',width:'100%'}}>
        <header style={{height:'1.4rem'}}>
          <div className="head">
            <div className="toback" onClick={ () => {this.backPrevious()}} />
            <h2>商户详情</h2>
          </div>
        </header> 
        <div className="userAchievementDetailWrap">
          <div className="userInfo" style={{display:'flex',alignItems:'center'}}>
            <img src={require('../../assets/img/tx.png')} alt=""/>
            <div className="userMsg">
              <span>{this.state.merchantDetailData.username}</span>
              <span className="userAddress">{this.state.merchantDetailData.detAddress}</span>
              <p className="userId">{this.state.merchantDetailData.idCard}</p>
            </div>
          </div>
          <div className="userAchievementDetailContent">
            <div className={this.judgeRepayAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.merchantDetailData.repaymentAmtMonth)}</dt>
                <dd>本月还款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.merchantDetailData.allRepaymentAmt)}</dt>
                <dd>累计还款交易量 (元)</dd>
              </dl>
            </div>
            <div className={this.judgeReceiptAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.merchantDetailData.receivablesAmtMonth)}</dt>
                <dd>本月收款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.merchantDetailData.allReceivablesAmt)}</dt>
                <dd>累计收款交易量 (元)</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default merchantDetail