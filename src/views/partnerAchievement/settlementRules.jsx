import React, { Component } from 'react'
import '../../assets/css/partnerPerformance.css'
class SettlementRules extends Component {
  constructor () {
    super()
    this.state ={
      show:false
    }
    this.stopUp = this.stopUp.bind(this)
  }
  getStatus () {
    return true === this.state.show ? 'settlementCover' :'settlementHide'
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.show !== prevState.show) {
      return {
        show:nextProps.show
      }
    }
    return null
  }
  stopUp (event) {
    event.stopPropagation()
  }
  render () {
    return (
      <div className={this.getStatus()} onClick={this.props.getHide}>
        <div className="settlementBox" onClick={this.stopUp}>
          <h2>结算规则</h2>
          <div className="rulesContent">
            <p style={{color:' #0f0f0f',fontSize:'.14rem',padding:'.24rem 0 0'}}>为鼓励合伙人积极发展下级团队，除自身所享
受的交易分润外，还额外享有下级团队的业绩
奖励。</p>
            <div>
              <h3 className='ruleSubTit'>分润奖</h3>
              <p>当月个人业绩总收益+每个合伙人收益的差额补贴。</p>
            </div>
            <div>
              <h3 className='ruleSubTit'>管理奖</h3>
              <p>当月旗下团队存在两个以上(包含两个)合伙人交易额≥2000万，则可享受2000元(每个团队)的奖励。</p>
            </div>
            <div>
              <h3 className='ruleSubTit'>卓越奖</h3>
              <p>当月旗下团队存在三个以上(包含三个)团队交易额≥2000万，最高可以获得每人每月2000元奖励。</p>
            </div>
            <div>
              <h3 className='ruleSubTit'>荣耀奖</h3>
              <p>当月旗下团队交易额在1亿以上，最高可额外获得2万元的奖励。</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SettlementRules