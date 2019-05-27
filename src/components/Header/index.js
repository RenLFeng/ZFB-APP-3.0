import React from 'react'
import style from './css.module.scss'

import BlackArrow from '../../assets/img/blackBackBtn.png'
import WhiteArrow from '../../assets/img/login_icon_back_w.png'

export default function Header(props) {
  const baseStyle = {
    zIndex: '10',
    width: '100vw',
    height: '6vh',
    backgroundColor: '#fff'
  }
  const { title, handleGoBack, whiteArrow, color, backgroundColor } = props
  const mergeStyle = { ...baseStyle, color, backgroundColor }
  return (
    <div className={style.Header} style={mergeStyle}>
      <div className={style.title}>{title}</div>
      <div className={style.parts}>
        <div onClick={handleGoBack} className={style.arrow}>
          <img src={whiteArrow ? WhiteArrow : BlackArrow} alt="" />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  )
}

Header.defaultProps = {
  backgroundColor: '#fff',
  color: '#000'
}
