import React from 'react'
import imgSrc from '../../assets/img/empty-content.png'
import style from './index.module.css'

export default function Empty() {
  return (
    <div className={style.noContent}>
      <div>
        <img src={imgSrc} alt="" />
        <p>暂无收益</p>
      </div>
    </div>
  )
}
