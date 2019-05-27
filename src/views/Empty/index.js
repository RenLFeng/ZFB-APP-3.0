import React from 'react'
import imgSrc from '../../assets/img/empty-content.png'
import style from './index.module.css'

const Empty = props => {
  const { text } = props
  return (
    <div className={style.noContent}>
      <div>
        <img src={imgSrc} alt="" />
        <p>{text}</p>
      </div>
    </div>
  )
}
export default Empty
