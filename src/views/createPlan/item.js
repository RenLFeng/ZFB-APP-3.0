import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/index'
import Dialog from '../../components/Dialog/index'
import css from './item.module.scss'
import { planDetailsOutlineData, tableInfoList, statusMap } from './map'
import { postWithJson } from '../../store/requestFacade'
import Schedule from '../plan/schedule'
import ComfirmDialog from '../../components/Dialog/confirm'
import Toast from '../../components/_toast/index'

export default function Plan(props) {
  const pathName = props.location.pathname.slice(1)
  console.log('pathName: ', pathName)
  const { planId, bankName, goback } = props.location.query
  const [count, setCount] = useState(1)
  const [dialogVisiblity, setdialogVisiblity] = useState(false)
  const [ComfirmDialogVisiblity, setComfirmDialogVisiblity] = useState(false)
  const [title, setTitle] = useState('计划详情')
  const [ComfirmOperation, setComfirmOperation] = useState(false)
  const [statusGroups, setStatusGroups] = useState({
    statusCode: '',
    endEnable: '',
    pauseEnable: '',
    recoverEnable: '',
    pauseSms: ''
  })
  const [tableInfoObj, setTableInfoObj] = useState({
    planId: '',
    planLength: '',
    status: '',
    tail: '',
    refund: {}
  })
  const [planInfoData, setPlanInfoData] = useState({
    workingAmount: '0.00', // 周转金
    totalAmount: '0.00',
    payCostTotal: '0.00',
    repayCount: 0,
    scheduleList: []
  })
  const [btnType, setBtnType] = useState('')

  const handleNavigationGoBack = () => {
    if (pathName === 'submitplan') {
      goback()
    }
    if (pathName === 'planItem') {
      window.getLoadData.jump('planList')
    }
  }
  const handleGoBack = () => {
    goback()
  }
  const getPlanDetails = async () => {
    try {
      const res = await postWithJson({
        url: 'v3/plan/detail',
        data: {
          planId
        }
      })
      console.log(res)
      if (res.retCode === '0000') {
        setPlanInfoData({
          workingAmount: res.data.workingAmount, // 周转金
          totalAmount: res.data.totalAmount, // 周转金
          payCostTotal: res.data.payCostTotal, //还款手续费
          repayCount: res.data.repayCount, // 还款笔数
          scheduleList: res.data.group // 任务列表
        })
        setTableInfoObj({
          planId: res.data.planId,
          planLength: res.data.planLength,
          status: res.data.status,
          tail: res.data.tail,
          refund: res.data.refund
        })
        setTitle(res.data.bankName)
        setStatusGroups({
          statusCode: res.data.status,
          endEnable: res.data.endEnable,
          pauseEnable: res.data.pauseEnable,
          recoverEnable: res.data.recoverEnable,
          pauseSms: res.data.pauseSms,
          pauseReason: res.data.pauseReason
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('before useEffect: ')

  useEffect(() => {
    console.log('had in  useEffect: ')
    getPlanDetails()
  }, [count])

  const handleToggleDialogVisiblity = () => {
    setdialogVisiblity(!dialogVisiblity)
  }

  const handleToggleComfrimVisiblity = () => {
    setComfirmDialogVisiblity(true)
  }

  const handleComfirmYES = async () => {
    const goPlanList = () => {
      window.getLoadData.jump('planList')
    }
    const goAppHome = () => {
      console.log('gobackToMyRootView')
      window.getLoadData.gobackToMyRootView()
    }
    const handleBtnTwo = () => {
      props.history.push({
        pathname: 'planItem',
        query: {
          planId: planId,
          goback: goAppHome
        }
      })
    }
    try {
      const res = await postWithJson({
        url: 'v3/plan/apply',
        data: {
          planId
        }
      })
      if (res.retCode === '0000') {
        props.history.push({
          pathname: 'result',
          query: {
            pageTitle: '制定计划',
            status: 'ok',
            feedBackText: '制定还款计划成功',
            btn1Text: '返回',
            btn2Text: '查看计划详情',
            handleBtnOne: goPlanList,
            handleBtnTwo,
            handleGoBack: goAppHome,
            number: 2,
            type: 'createPlan',
            turnoverMoney: planInfoData.workingAmount
          }
        })
      } else {
        Toast.info(res.retMsg, 2000)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const handleComfirmNO = () => {
    setComfirmDialogVisiblity(false)
  }
  const handleOperationPlan = async type => {
    const api = {
      end: 'v3/plan/end',
      recover: 'v3/plan/recover',
      pause: 'v3/plan/pause'
    }
    try {
      const res = await postWithJson({
        url: api[type],
        data: {
          planId
        }
      })
      if (res.retCode === '0000') {
        setComfirmOperation(false)
        setCount(count + 1)
        Toast.info('操作成功', 2000)
      } else {
        Toast.info(res.retMsg, 2000)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }
  const handleComfirmOperationYES = () => {
    handleOperationPlan(btnType)
  }
  const handleComfirmOperationNO = () => {
    setComfirmOperation(false)
    console.log('handleComfirmOperationNO')
  }
  const handleOpenOperationComfirm = type => {
    setComfirmOperation(true)
    setBtnType(type)
  }
  const catalogList = planDetailsOutlineData(planInfoData)
  const table = tableInfoList(tableInfoObj)
  console.log('setStatusGroups: ', statusGroups)

  const hasButton =
    pathName !== 'planItem'
      ? {}
      : [statusGroups.endEnable, statusGroups.pauseEnable, statusGroups.recoverEnable].filter(
          Boolean
        ).length
      ? {}
      : { gridTemplateRows: '6vh auto 0px' }

  return (
    <>
      <div className={css.plan} style={hasButton}>
        <div id="_1">
          <Header
            title={pathName === 'planItem' ? title : bankName}
            handleGoBack={handleNavigationGoBack}
            whiteArrow
            color="#fff"
            backgroundColor="#4289ff"
          />
        </div>
        <div className={css.itemData} id="_2">
          {pathName === 'planItem' && [2, 3].includes(statusGroups.statusCode) && (
            <div className={css.hints} id="_2-1">
              {statusMap[statusGroups.statusCode]}: {statusGroups.pauseReason}
              <br />
              {statusGroups.pauseSms}
            </div>
          )}
          {pathName === 'planItem' && (
            <div className={css.tableInfo}>
              {table.map(v => (
                <p key={v.id}>
                  <span>{v.label}</span>
                  <span>
                    {v.value}
                    {v.unit}
                  </span>
                </p>
              ))}
            </div>
          )}
          <div className={css.outline} style={pathName !== 'planItem' ? { marginTop: '30px' } : {}}>
            {catalogList.map(v => (
              <div className={css.catalog} key={v.id}>
                <div className={css.imgarea}>
                  <img src={v.src} alt="logo" />
                </div>
                <div className={css.text}>
                  <p>
                    {v.label}
                    {v.id === 1 && <i onClick={handleToggleDialogVisiblity}>?</i>}
                  </p>
                  <span>{`${v.value}${v.unit}`}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={pathName === 'submitplan' ? css.wrap : css.wrap}>
            {planInfoData.scheduleList.length > 0 &&
              planInfoData.scheduleList.map(v => <Schedule info={v} key={v.date} />)}
          </div>
        </div>
        <div id="_3" className={css.btnArea}>
          {pathName === 'submitplan' && (
            <>
              <p className={css.white} onClick={handleGoBack}>
                重新规划
              </p>
              <p onClick={handleToggleComfrimVisiblity}>提交计划</p>
            </>
          )}
          {pathName === 'planItem' && (
            <>
              {statusGroups.endEnable && (
                <p
                  onClick={() => {
                    handleOpenOperationComfirm('end')
                  }}
                  className={statusGroups.recoverEnable ? css.white : ''}
                >
                  结束计划
                </p>
              )}
              {statusGroups.recoverEnable && (
                <p
                  onClick={() => {
                    handleOpenOperationComfirm('recover')
                  }}
                >
                  恢复计划
                </p>
              )}
              {statusGroups.pauseEnable && (
                <p
                  onClick={() => {
                    handleOpenOperationComfirm('pause')
                  }}
                >
                  暂停计划
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <Dialog isShow={dialogVisiblity} handleClose={handleToggleDialogVisiblity}>
        <div className={css.turnover}>
          <div className={css.curtain} />
          <p>
            周转金是您信用卡内事先预留的可用额度，包含了平台需要扣取的手续费，用于还款计划先消费后还款的周转操作。
          </p>
          <p className={css.wranInfo}>请确保信用卡有足够的可用额度，避免还款计划失败。</p>
        </div>
      </Dialog>
      <ComfirmDialog
        isShow={ComfirmDialogVisiblity}
        handleYes={handleComfirmYES}
        handleNo={handleComfirmNO}
        okText="执行计划"
      >
        <p style={{ textAlign: 'center' }}>确定执行{bankName}还款计划?</p>
      </ComfirmDialog>
      <ComfirmDialog
        isShow={ComfirmOperation}
        handleYes={handleComfirmOperationYES}
        handleNo={handleComfirmOperationNO}
        okText={btnType === 'end' ? '结束计划' : btnType === 'recover' ? '恢复计划' : '暂停计划'}
      >
        <p style={{ textAlign: 'center' }}>
          {btnType === 'end'
            ? '确定结束计划吗？'
            : btnType === 'recover'
            ? '确定恢复计划吗？'
            : '确定暂停计划吗？'}
        </p>
      </ComfirmDialog>
    </>
  )
}
