import React from 'react'
import style from './card.module.scss'
import { formatDate } from '../../../public/utils'

const StorageCard = props => {
  const { data, text, handleCancelDeposit, handleDepositDetails } = props
  return (
    <li key={data.brandId} className={style.layout} onClick={handleDepositDetails}>
      <div className={style.title}>
        <span className={style.txt}>
          {data.name}
          {/* {Number(data.isDeposit) === 1 && <i>押金</i>} */}
        </span>
        <span className={style.Cancellation}>
          {Number(data.isDeposit) === 1 &&
            Number(data.activiteStatus) === 0 &&
            text === '下发时间' && <i onClick={handleCancelDeposit}>取消押金</i>}
          {/* {Number(data.number) > 1 && (
            <i className={style.more} onClick={showMore}>
              查看设备
            </i>
          )} */}
        </span>
        {/* {Number(data.number) === 1 && (
          <span className={style.Badge} style={{ backgroundColor: '#ccc' }}>
            已换机&nbsp;&nbsp;
          </span>
        )} */}
      </div>
      <ul className={style.info}>
        <li>
          <span>设备型号</span>
          <span>{data.brandName}</span>
        </li>
        {Number(data.number) > 1 && (
          <li>
            <span>设备数量</span>
            <span>{data.number}台</span>
          </li>
        )}
        {Number(data.number) === 1 && (
          <li>
            <span>设备编号</span>
            <span>{data.devNo}</span>
          </li>
        )}
        <li>
          <span>{text}</span>
          <span>{formatDate(data.time)}</span>
        </li>
      </ul>
    </li>
  )
}

export { StorageCard }

StorageCard.defaultProps = {
  handleCancelDeposit: null,
  handleDepositDetails: null,
  showMore: null
}
