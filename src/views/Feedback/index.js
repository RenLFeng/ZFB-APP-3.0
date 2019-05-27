import React from 'react'
import css from './index.module.scss'
import url from '../../assets/img/feedbackProcessing.png'

export default function FeedBack(props) {
  const handleGoHome = () => {
    // window.getLoadData.gobackToMyRootView()
    window.getLoadData.jump({
      path: 'channellist'
    })
  }
  return (
    <div className={css.feedback}>
      <div className={css.content}>
        <div className={css.inner}>
          <img src={url} alt="" />
          <span>处理中,请稍后</span>
        </div>
        <p onClick={handleGoHome}>返回</p>
      </div>
    </div>
  )
}
