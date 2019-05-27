import React, { Component } from 'react'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
class vipDetail extends Component {
  constructor () {
    super()
    this.state = {
      vipDetailData:''
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  async getvipDetail () {
    try{
      const res = await post({
        url:'onLineMonthresults/partnerInfo',
        data:{
          organId:this.props.location.state.organId,
          organType:this.props.location.state.organType
        }
      })
      this.setState({
        vipDetailData:res.data
      })
    }catch(err) {
      console.log(err)
    }
  } 
  judgeRepayAmount () {
    console.log(this.state.vipDetailData.repaymentIsMust)
    if(this.state.vipDetailData.repaymentIsMust === 1 ) {
      return 'achievetwentyMillon'
    }
    else if(this.state.vipDetailData.repaymentIsBillion === 1 ) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  judgeReceiptAmount() {
    if(this.state.vipDetailData.receivablesIsMust === 1) {
      return 'achievetwentyMillon'
    }
    else if (this.state.vipDetailData.receivablesIsBillion === 1) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  componentDidMount () {
    this.getvipDetail()
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <header style={{height:'1.4rem'}}>
          <div className="head">
            <div className="toback" onClick={ () => {this.backPrevious()}} />
            <h2>VIP详情</h2>
          </div>
        </header> 
        <div className="userAchievementDetailWrap" style={{height:'6.4rem'}}>
          <div className="userInfo">
            <img src={require('../../assets/img/tx.png')} alt=""/>
            <span style={{color:'#fff',zIndex:'99'}}>{this.state.vipDetailData.username}</span>
          </div>
          <div className="userAchievementDetailContent">
            <div className="allusers">
              <dl>
                <dt>{this.state.vipDetailData.newMerchant}</dt>
                <dd>本月新增商户 (户)</dd>
              </dl>
              <dl style={{width:'1px',height:'.5rem',backgroundColor:'#e5e5e5'}}></dl>
              <dl>
                <dt>{this.state.vipDetailData.merchant}</dt>         
                <dd>累计商户 (户)</dd>
              </dl>
            </div>
            <div className={this.judgeRepayAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.vipDetailData.repaymentAmtMonth)}</dt>
                <dd>本月还款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.vipDetailData.allRepaymentAmt)}</dt>
                <dd>累计还款交易量 (元)</dd>
              </dl>
            </div>
            <div className={this.judgeReceiptAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.vipDetailData.receivablesAmtMonth)}</dt>
                <dd>本月收款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.vipDetailData.allReceivablesAmt)}</dt>
                <dd>累计收款交易量 (元)</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default vipDetail