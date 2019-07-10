/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/index'
import css from './index.module.scss'
import { planMethods, accessItemById, accessPlanBaseData } from './map'
import { postWithJson } from '../../store/requestFacade'
import { parseURL } from '../../store/URL'
import dayjs from 'dayjs'
import Dialog from '../../components/Dialog/index'
import Slider from 'rc-slider'
import Toast from '../../components/_toast/index.js'
import { getLongestPeriod } from '../../core/plan/longestPeriod'
import 'rc-slider/assets/index.css'
import {cutTime,cutAmount} from '../../store/filter'
const TYPE_AUDIO = Symbol()
console.log('TYPE_AUDIO',TYPE_AUDIO);
export default function Plan(props) {
  console.log(props);
  const pathName = props.location.pathname.slice(1)
  const propsBody = { ...parseURL(decodeURI(props.location.search)), ...props.location.state }
  const {
    type,
    title,
    billDate,
    repayDate,
    channelKey,
    channelName,
    merchantArea,
    cardNo
  } = propsBody

  const today = dayjs().date()
  const currentMonthLength = dayjs().daysInMonth()
  const calc = getLongestPeriod({
    billDate: Number(billDate),
    repayDate: Number(repayDate),
    today: Number(today),
    currentMonthLength: Number(currentMonthLength)
  })
  // 最长还款周期
  const availableList = planMethods(calc)
  const canSelectedList = availableList.filter(v => v.available)
  const [currentId, setcurrentId] = useState(
    canSelectedList.length > 0 ? availableList.filter(v => v.available)[0].id : 0
  )
  const [min, max] = accessItemById(availableList, currentId)[0].Interval
  const [returnDay, setReturnDay] = useState(min)
  const [value, setvalue] = useState(min)
  const [billAmount, setBillAmount] = useState(0)
  const [ReminderVisiblity, setReminderVisiblity] = useState(false)
  const accumulator = 0

  const handleToggleReminderVisiblity = () => {
    setReminderVisiblity(false)
  }
  const BaseInfoList = accessPlanBaseData(propsBody)

  const handleInputBillAmount = event => {
    setBillAmount(event.target.value)
  }

  const handleGoBack = () => {
    window.getLoadData.finishTist()
  }

  const handleSlideChanged = value => {
    setvalue(value)
    setReturnDay(value)
  }

  const handleSelected = v => {
    if (!v.available) {
      return
    }
    setcurrentId(v.id)
    setvalue(0)
  }

  const handlePropsGoback = () => {
    props.history.push({
      pathname: 'createplan',
      state: { ...propsBody }
    })
  }

  async function handleUserCreatePlan() {
    const regex = /^[1-9][0-9]*$/
    if (!billAmount) {
      Toast.info('您尚未填写账单金额', 1500)
      return
    }
    if (!regex.test(billAmount)) {
      Toast.info('填写金额有误', 1500)
      return
    }
    const api = 'v3/plan/create/'
    const body = {
      totalAmount: billAmount,
      cardNo: cardNo,
      planLength: returnDay,
      ratio: availableList.filter(v => v.id === currentId)[0].rate,
      channelKey: 'helibao_pos_channel'
    }
    try {
      const res = await postWithJson({
        url: api,
        data: body
      })
      console.log('res: ', res)
      if (res.retCode === '0000') {
        props.history.push({
          pathname: 'submitplan',
          query: {
            goback: handlePropsGoback,
            planId: res.data.planId,
            bankName: title
          }
        })
      } else {
        Toast.info(res.retMsg, 2000)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const Init = () => {
    console.log('pathName: ', pathName)
    type === 'online' && setReminderVisiblity(true)
  }
  useEffect(() => {
    Init()
  }, [accumulator])

  return (
    <div className={css.plan}>
      <Header
        title={title}
        handleGoBack={handleGoBack}
        whiteArrow
        color="#fff"
        backgroundColor="#4289ff"
      />

      <div className={css.content}>
        <div className={css.bg}>
          <div className={css.blue} />
          <div className={css.gary} />
        </div>
        <div className={css.card}>
          <section className={css.form}>
            {BaseInfoList.map(v => (
              <div key={v.id}>
                <span>{v.lable}</span>
                <span>{`${v.value}${v.unit}`}</span>
              </div>
            ))}
          </section>
          <section className={css.form}>
            {canSelectedList.length > 0 && (
              <div className={css.BillArea}>
                <span>账单金额</span>
                <span className={css.blueFont}>
                  <input
                    type="number"
                    onChange={handleInputBillAmount}
                    style={{ direction: 'ltr', fontWeight: 'bolder', textAlign: 'right' }}
                  />
                  <b style={{ fontWeight: 'bolder' }}> 元</b>
                </span>
              </div>
            )}
            <div>
              <span>费率</span>
              <span>{type === 'online' ? '0.85%+单笔1元' : '0.85%+单笔0.5元'}</span>
            </div>
            <div className={css.planMethods}>
              {availableList.map(v => (
                <span
                  key={v.id}
                  className={v.available ? (v.id === currentId ? css.actived : '') : css.diabled}
                  onClick={() => {
                    handleSelected(v)
                  }}
                >
                  {v.text}
                </span>
              ))}
            </div>
            {canSelectedList.length > 0 && (
              <>
                <Slider
                  className={css.nbb}
                  trackStyle={{ backgroundColor: '#4289ff' }}
                  handleStyle={{ borderColor: '#4289ff' }}
                  onChange={handleSlideChanged}
                  value={value}
                  min={min}
                  max={max}
                />
                <div className={css.Days}>
                  <p>
                    <span>最少天数</span>
                    <span>{min}天</span>
                  </p>
                  <p className={css.selected}>
                    <span>还款天数</span>
                    <span>{returnDay}天</span>
                  </p>
                  <p>
                    <span>最大天数</span>
                    <span>{max}天</span>
                  </p>
                </div>
              </>
            )}
          </section>
          <section className={css.form+' '+css.cue}>
            <ul>
            <li className={css.cueTitle}><h1>温馨提示：</h1></li>
            <li className={css.item}>下午16：00前制定计划,当日执行</li>
            <li className={css.item}>下午16：00后制定计划,次日天执行</li>
          </ul>
          </section>
          
          <section className={css.formBtn}>
            {canSelectedList.length > 0 ? (
              <p onClick={handleUserCreatePlan} className={!billAmount ? css.disable : ''}>
                制定计划 ({returnDay}天)
              </p>
            ) : (
              <p className={css.disable}>还款日小于三天，不能制定计划</p>
            )}
          </section>
          <Dialog isShow={ReminderVisiblity} handleClose={handleToggleReminderVisiblity}>
            <div className={css.turnover}>
              <div className={css.reminder}>
                <h3>温馨提示</h3>
                <p>1.有计划使用快捷还款，有效降低用卡风险</p>
                <p>2.建议快捷还款同时，搭配信用卡日常消费</p>
                <p>3.推荐使用设备还款，更安全还款解决方案</p>
                <p>
                  详询请致电：<a href="tel:4008433388">400-843-3388</a>
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
