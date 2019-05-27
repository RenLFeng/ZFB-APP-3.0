import React, { useState, useEffect } from 'react'
import css from './css.module.scss'
import Header from '../../components/Header/index'
import src from '../../assets/img/100000.jpg'
import { moneyRate, StatusMap } from './map'
import { getDepositInfo } from '../../public/api'
import { post } from '../../public/call'
import dayjs from 'dayjs'
import { parseURL } from '../../store/URL'

export default function Index(props) {
  console.log('path :', window.location.href)
  const idFromSearch = { ...parseURL(decodeURI(props.location.search)) }
  const id = props.location.query ? props.location.query.devNo : idFromSearch.id
  const organId = props.location.query ? props.location.query.organId : ''

  const [info, setInfo] = useState({
    userName: '押金设备',
    depositStagePO: [{ totalTradeAmt: 30 }, { totalTradeAmt: 60 }, { totalTradeAmt: 90 }],
    // totalTradeAmtAdd: 50,
    totalTradeAmtAdd: 0,
    totalTradeAmt: 180,
    status: 1,
    beginTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    payDepositTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    brandId: '设备'
  })
  const moneylist = moneyRate(info)
  const progress = (info.totalTradeAmtAdd / info.totalTradeAmt) * 100 + '%'
  const currnetStatus = StatusMap.filter(v => v.status === Number(info.status))[0]
  const currnetTipsStyle = {
    backgroundColor: currnetStatus.tipColor,
    color: currnetStatus.color
  }
  const statusName = currnetStatus.statusName
  const markIconStyle = {
    borderColor: currnetStatus.color
  }
  const StepStyle = {
    gridTemplateColumns: `repeat(${moneylist.length - 1}, 1fr) auto`
  }
  const fetchInfoByID = async () => {
    try {
      const res = await post({
        url: getDepositInfo,
        data: {
          devNo: id,
          organId
        }
      })
      setInfo({
        ...res.data,
        totalTradeAmtAdd: res.data.totalTradeAmtAdd || 0,
        beginTime: res.data.beginTime
          ? dayjs(res.data.beginTime).format('YYYY-MM-DD HH:mm:ss')
          : res.data.beginTime,
        endTime: res.data.endTime
          ? dayjs(res.data.endTime).format('YYYY-MM-DD HH:mm:ss')
          : res.data.endTime,
        payDepositTime: res.data.payDepositTime
          ? dayjs(res.data.payDepositTime).format('YYYY-MM-DD HH:mm:ss')
          : res.data.payDepositTime,
        brandId: Number(res.data.brandId) === 1 ? 'YXJ001' : 'YXJ002'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoBack = () => {
    if (props.location.query && props.location.query.devNo) {
      props.history.push({
        pathname: 'flowRecord',
        query: {
          type: 2
        }
      })
      console.log("go 2 flowRecord')")
    } else {
      console.log("window.getLoadData.jump('DevicePaymentPage')")
      window.getLoadData.jump('DevicePaymentPage')
    }
  }
  useEffect(() => {
    fetchInfoByID()
  }, [])
  return (
    <>
      <div className={css.deposit}>
        <section>
          <Header
            title={info.userName}
            handleGoBack={handleGoBack}
            whiteArrow
            color="#fff"
            backgroundColor="#4289ff"
          />
        </section>
        <section className={css.brief}>
          <div>
            <img src={src} alt="img" />
          </div>
          <div>
            <p style={{ color: '#fff' }}>设备型号:{info.brandId}</p>
            <p style={{ color: '#fff' }}>设备编号:{id}</p>
            <p style={{ color: '#fff' }}>设备押金:{info.depositAmt}元</p>
          </div>
        </section>
        <section className={css.rest}>
          <div className={css.card}>
            <div className={css.cardBody}>
              <div className={css.top}>{statusName}</div>
              <div className={css.progress}>
                <section className={css.bar} style={StepStyle}>
                  {moneylist &&
                    moneylist.map(v => <div className={v.isActived ? css.light : ''} key={v.id} />)}
                  <p style={{ width: progress }} />
                </section>
                <section className={css.number} style={StepStyle}>
                  {moneylist &&
                    moneylist.map(v => (
                      <div key={v.id}>
                        {v.rate + ''}
                        {v.rate > 0 ? '万' : ''}
                      </div>
                    ))}
                </section>
              </div>
              <div className={css.Statistics}>
                <div>
                  <p>累计还款</p>
                  <p>{info.totalTradeAmtAdd || 0}元</p>
                </div>
                <div className={css.divider} />
                <div>
                  <p>累计返现</p>
                  <p>{info.returnDepositAmt || 0}元</p>
                </div>
                <div className={css.divider} />
                <div>
                  <p>剩余天数</p>
                  <p>{info.day}天</p>
                </div>
              </div>
            </div>
          </div>
          <div className={css.tips} style={currnetTipsStyle}>
            <b style={markIconStyle}>!</b>
            {currnetStatus.tipText}
          </div>
          <div className={css.time}>
            <h4>时间记录</h4>
            {info.beginTime && <p>开始时间 {info.beginTime} </p>}
            {info.endTime && <p>结束时间 {info.endTime} </p>}
            {info.payDepositTime && <p>缴纳押金时间 {info.payDepositTime}</p>}
          </div>
        </section>
      </div>
    </>
  )
}
