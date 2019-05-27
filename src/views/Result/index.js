import React from 'react'
import Header from '../../components/Header/index'
import css from './index.module.scss'
import penddigImg from '../../assets/img/feedbackProcessing.png'
import okImg from '../../assets/img/feedback-ok.png'

export default function Result(props) {
  const pathName = props.location.pathname.slice(1)
  console.log('pathName: ', pathName)

  const {
    pageTitle,
    handleGoBack,
    status,
    feedBackText,
    btn1Text,
    btn2Text,
    handleBtnOne,
    handleBtnTwo,
    number,
    type,
    turnoverMoney
  } = props.location.query
  console.log('props.location.query: ', props.location.query)

  return (
    <div>
      <div>
        <Header
          title={pageTitle}
          handleGoBack={handleGoBack}
          blackArrow
          color="#000"
          backgroundColor="#fff"
        />

        <div className={css.feedback}>
          <div className={css.content}>
            <img src={status === 'ok' ? okImg : penddigImg} alt="" />
            <span>{feedBackText}</span>
            {type === 'createPlan' && (
              <div className={css.createPlan}>
                <p>
                  请确保您的信用卡可用额度不低于计划周转金<i className={css.red}>{turnoverMoney}</i>
                  元。
                </p>
                <p>计划执行期间，不能改变信用卡信息，避免计划执行失败，影响您的信用卡还款。</p>
              </div>
            )}
          </div>
          <div className={css.BtnGroup}>
            <p onClick={() => handleBtnOne()}>{btn1Text}</p>
            {number !== 1 && <p onClick={() => handleBtnTwo()}>{btn2Text}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

Result.defaultProps = {
  backgroundColor: '#fff',
  color: '#000',
  number: 1,
  status: 'ok',
  pageTitle: 'result',
  feedBackText: 'feedBackText',
  btn1Text: 'btn1Text',
  btn2Text: 'btn2Text',
  handleBtnOne: () => null,
  handleBtnTwo: () => null,
  handleGoBack: () => null,
  type: '',
  turnoverMoney: 0
}
