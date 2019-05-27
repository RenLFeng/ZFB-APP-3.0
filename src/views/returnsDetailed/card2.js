import React, { Component } from 'react'
import style from './earn.module.css'
import { programTypeMAP } from './map'

export default class Card extends Component {
  render() {
    const v = this.props.info
    return (
      <li>
        <ul className={style.cell}>
          <p>{programTypeMAP[v.profitType]}</p>
          <li className={style.info}>
            <span>收益金额</span>
            <span>{v.profitAmt}元</span>
          </li>
          <li className={style.info}>
            <span>收益时间</span>
            <span>{v.profitTime}</span>
          </li>
          <li className={style.info}>
            <span>收益来源</span>
            <span>{v.profitSource}</span>
          </li>
          <li className={style.info}>
            {/* <span>{SettlementMAP[v.profitSettlement][1]}</span> */}
            <span>订单号</span>
            <span>{v.tradeNo}</span>
          </li>
        </ul>
      </li>
    )
  }
}

// {
//   "profitAmt": 100,
//   "profitTime": "2018-12-25 00:35:45",
//   "profitSource": "蔡*(137****1241)",
//   "tradeNo": null,
//   "profitMonth": null,
//   "profitType": "1",   //1激活奖励，3购机
//   "profitSettlement": null
// },
