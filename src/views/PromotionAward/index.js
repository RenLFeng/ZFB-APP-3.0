import React, { useState, useEffect } from 'react'
import css from './index.module.scss'
import { accessTablelist, accessCatalogList } from './calc'
import { post } from '../../store/requestFacade'
import Empty from '../../components/Empty/index'
import Header from '../../components/Header/index'

export default function Plan(props) {
  const [currentIndex, setCurrentIndex] = useState('Registered')
  const [rList, setrList] = useState([])
  const [cList, setcList] = useState([])
  const [aList, setaList] = useState([])
  const [inviteTips, setinviteTips] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0)
  // 已激活 (5) Activated
  const count = 1
  const tablelist = accessTablelist(currentIndex)
  const handleGoBack = () => {
    props.history.push({
      pathname: 'RewardDescription'
    })
  }
  // 已注册 Registered
  const registered = async () => {
    try {
      const res = await post({
        url: '/onlineInvite/registered',
        data: {
          pageSize: 100,
          pageNumber: 1
        }
      })
      return res.data.rows
    } catch (error) {
      console.log(error)
    }
  }
  // 已认证 (5) Certified  已激活 (5) Activated
  const CertifiedANDActivated = async number => {
    console.log('number: ', number)
    try {
      const res = await post({
        url: '/onlineInvite/certified',
        data: {
          pageSize: 100,
          pageNumber: 1,
          status: number
        }
      })
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const accessVipProcess = async () => {
    try {
      const res = await post({
        url: '/onlineInvite/inviteTips'
      })
      console.log('accessVipProcess.res.data: ', res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAll = async () => {
    const registeredlist = registered()
    const Certifiedlist = CertifiedANDActivated(1)
    const Activatedlist = CertifiedANDActivated(2)
    const tipsData = accessVipProcess()
    return {
      registeredList: await registeredlist,
      CertifiedList: await Certifiedlist,
      ActivatedList: await Activatedlist,
      tips: await tipsData
    }
  }

  const init = async () => {
    try {
      const result = await fetchAll()
      console.log('result: ', result)
      setrList(result.registeredList)
      setcList(result.CertifiedList.rows)
      setaList(result.ActivatedList.rows)
      setinviteTips(result.tips)
      setTotalMoney(result.ActivatedList.amtSum)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedTabs = v => {
    setCurrentIndex(v.type)
    document.getElementById('promotionAwardWrap').scrollTop = 0
  }
  useEffect(() => {
    init()
  }, [count])

  const catalogList = accessCatalogList()
  const showBottomTips =
    currentIndex === 'Registered'
      ? rList.length > 0
      : currentIndex === 'Certified'
      ? cList.length > 0
      : aList.length > 0

  return (
    <div className={css.PromotionAward}>
      <Header
        title={''}
        handleGoBack={handleGoBack}
        whiteArrow
        color="#fff"
        backgroundColor="transparent"
      />
      <div className={css.outline}>
        <div>
          <h4>{totalMoney}.00</h4>
          <span>累计奖励金 (元)</span>
        </div>
        {inviteTips ? (
          <p className={css.tips}>
            <i>!</i>
            您有{inviteTips.certified}名好友完成实名认证，还差{inviteTips.surplus}名好友升级为VIP
          </p>
        ) : (
          <p className={css.tips}>
            {' '}
            <i>!</i>您已成为VIP，可以永久享有好友的分润奖励
          </p>
        )}
      </div>
      <div className={css.catalog}>
        <section>
          {catalogList &&
            catalogList.map(v => (
              <p
                key={v.id}
                className={v.type === currentIndex ? css.actived : ''}
                onClick={() => {
                  handleSelectedTabs(v)
                }}
              >
                {v.lable}
              </p>
            ))}
        </section>
        <div className={css.content}>
          <div className={css.contentTable2}>
            {tablelist.map(v => (
              <p key={v.id}>{v.lable}</p>
            ))}
          </div>
          <div className={css.items} id="promotionAwardWrap">
            {currentIndex === 'Registered' &&
              (rList.length ? (
                rList.map((v, i) => (
                  <p key={i} className={css.rItems}>
                    <span>{v.phone}</span>
                    <span>{v.addDate}</span>
                  </p>
                ))
              ) : (
                <Empty text={'暂无数据'} styleOb={''} />
              ))}

            {currentIndex === 'Certified' &&
              (cList.length ? (
                cList.map((v, i) => (
                  <p key={i} className={css.cItems}>
                    <span>{v.userName}</span>
                    <span>+5</span>
                    <span>未激活</span>
                  </p>
                ))
              ) : (
                <Empty text={'暂无数据'} styleOb={''} />
              ))}
            {currentIndex === 'Activated' &&
              (aList.length ? (
                aList.map((v, i) => (
                  <p key={i} className={css.aItems}>
                    <span>{v.userName}</span>
                    <span>+5</span>
                    <span>已激活</span>
                  </p>
                ))
              ) : (
                <Empty text={'暂无数据'} styleOb={''} />
              ))}
          </div>
          {showBottomTips && <p className={css.recentData}> —— 只显示近期数据 ——</p>}
        </div>
      </div>
    </div>
  )
}
