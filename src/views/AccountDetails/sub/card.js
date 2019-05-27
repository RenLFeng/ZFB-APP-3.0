import React from 'react'
import style from './card.module.scss'
import { formatDate, getType } from '../../../public/utils'
const CardOne = props => {
  const { data } = props
  return (
    <section>
      {/* <div className={style.upArea}>还款日结</div> */}
      <div className={style.downArea}>
        <div>
          <p>收益金额</p>
          <p>{data.profitAmt}元</p>
        </div>
        <div>
          <p>收益时间</p>
          {/* <p>{formatDate(data.profitTime)}</p> */}
          <p>
            {getType(data.profitTime) === 'number' ? formatDate(data.profitTime) : data.profitTime}
          </p>
        </div>
        <div>
          <p>收益来源</p>
          <p>{data.profitSource}</p>
        </div>
        <div>
          <p>单号</p>
          <p>{data.tradeNo}</p>
        </div>
      </div>
    </section>
  )
}

// const CardTwo = props => {
//   // const { data, showMore, text } = props
//   const { data } = props
//   return (
//     <section>
//       {/* <div className={style.upArea}>还款日结</div> */}
//       <div className={style.downArea}>
//         <div>
//           <p>设备收款分润</p>
//           <p>{data.profitAmt}</p>
//         </div>
//         <div>
//           <p>收益时间</p>
//           <p>{formatDate(data.profitTime)}</p>
//         </div>
//         <div>
//           <p>收益来源</p>
//           <p>{data.profitSource}</p>
//         </div>
//         <div>
//           <p>订单号</p>
//           <p>{data.tradeNo}</p>
//         </div>
//       </div>
//     </section>
//   )
// }

export default {
  EquipmentRepayment: CardOne, // 设备还款分润
  EquipmentCollection: CardOne, // 设备收款分润
  QuickRepayment: CardOne, // 快捷还款分润
  QuickCollection: CardOne, // 快捷收款分润
  PlatformPurchase: CardOne, // 平台购机
  ActivationBonus: CardOne, // 激活奖励
  PromotionAward: CardOne, // 推广奖励
  openPartner: CardOne // 推广奖励
}
