import React from 'react'
import hoc from './hoc.module.scss'
import emptyImg from '../../assets/img/empty-content.png'

export const WithEmpty = Component => ({ isEmpty, extraText, ...props }) =>
  isEmpty ? (
    <div className={hoc.empty}>
      <div className={hoc.emptyContent}>
        <img src={emptyImg} alt="emptyImg" />
        <p>{extraText}暂无数据</p>
      </div>
    </div>
  ) : (
    <Component {...props} />
  )
