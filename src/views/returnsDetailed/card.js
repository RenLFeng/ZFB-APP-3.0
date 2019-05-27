import React, { Component } from 'react'
import style from './earn.module.css'
import { profitTypeMAP, SettlementMAP } from './map'

export default class Card extends Component {
  render() {
    const v = this.props.info
    return (
      <li>
        <ul className={style.cell}>
          <p>
            {profitTypeMAP[v.profitType]}-{SettlementMAP[v.profitSettlement][0]}
          </p>
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
            <span>{SettlementMAP[v.profitSettlement][1]}</span>
            <span>{v.tradeNo}</span>
          </li>
        </ul>
      </li>
    )
  }
}
