import React, { Component } from 'react'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import '../../assets/css/partnerPerformance.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
class partnerDetail extends Component {
  constructor () {
    super()
    this.state = {
      partnerDetailData:''
    }
  }
  backPrevious () {
    this.props.history.goBack()
  }
  async getPartnerDetail () {
    try{
      const res = await post({
        url:'monthresults/partnerInfo',
        data:{
          organId:this.props.location.state.organId,
          organType:this.props.location.state.organType
        }
      })
      this.setState({
        partnerDetailData:res.data
      })
    }catch(err) {
      console.log(err)
    }
  } 
  judgeRepayAmount () {
    console.log(this.state.partnerDetailData.repaymentIsMust)
    if(this.state.partnerDetailData.repaymentIsMust === 1 ) {
      return 'achievetwentyMillon'
    }
    else if(this.state.partnerDetailData.repaymentIsBillion === 1 ) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  judgeReceiptAmount() {
    if(this.state.partnerDetailData.receivablesIsMust === 1) {
      return 'achievetwentyMillon'
    }
    else if (this.state.partnerDetailData.receivablesIsBillion === 1) {
      return 'achieveBillon'
    }
    else {
      return null
    }
  }
  componentDidMount () {
    this.getPartnerDetail()
  }
  render () {
    console.log(this.props)
    return (
      <div>
        <header style={{height:'1.4rem'}}>
          <div className="head">
            <div className="toback" onClick={ () => {this.backPrevious()}} />
            <h2>合伙人详情</h2>
          </div>
        </header> 
        <div className="userAchievementDetailWrap"style={{height:'6.4rem'}}>
          <div className="userInfo">
            <img src={require('../../assets/img/tx.png')} alt=""/>
            <span style={{color:'#fff',zIndex:'99'}}>{this.state.partnerDetailData.username}</span>
          </div>
          <div className="userAchievementDetailContent">
            <div className="allusers">
              <dl>
                <dt>{this.state.partnerDetailData.newMerchant}</dt>
                <dd>本月新增商户 (户)</dd>
              </dl>
              <dl style={{width:'1px',height:'.5rem',backgroundColor:'#e5e5e5'}}></dl>
              <dl>
                <dt>{this.state.partnerDetailData.merchant}</dt>         
                <dd>累计商户 (户)</dd>
              </dl>
            </div>
            <div className={this.judgeRepayAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.partnerDetailData.repaymentAmtMonth)}</dt>
                <dd>本月还款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.partnerDetailData.allRepaymentAmt)}</dt>
                <dd>累计还款交易量 (元)</dd>
              </dl>
            </div>
            <div className={this.judgeReceiptAmount()}>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.partnerDetailData.receivablesAmtMonth)}</dt>
                <dd>本月收款交易量 (元)</dd>
              </dl>
            </div>
            <div>
              <dl style={{padding:'.36rem 0 0 0'}}>
                <dt>{cutAmount(this.state.partnerDetailData.allReceivablesAmt)}</dt>
                <dd>累计收款交易量 (元)</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default partnerDetail