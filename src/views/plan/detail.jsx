import React, { Component } from 'react'
import './assets/css/planDetail.css'
import { createHeader } from '../../components/header'
import { get, post } from '../../store/requestFacade'
import { parseURL } from '../../store/URL'
import Schedule from './schedule.js'
import { PausedInfo } from './pausedInfo'
import { toastIt } from '../../components/popup'
import Loader from '../../components/Loader/index'
import { TASK_TYPE, PLAN_STATUS, PLAN_STATUS_DESC } from '../../core/plan/display'
import { WorkingAmountDesc } from './workingAmountDesc'
import { EnsureDialog } from './ensureDialog'
import style from './schedule.module.scss'

const getTitle = ({ bankName, cardNo }) => {
  if (!bankName || bankName.length < 0 || !cardNo || cardNo.length < 0) {
    return ''
  }
  return `${bankName}(${cardNo.substr(cardNo.length - 4, 4)})`
}

const prepareData = (() => {
  const { search } = window.location
  const { planId, next } = parseURL(decodeURI(search))
  return {
    planId,
    next
  }
})()

const dialogName = {
  END_PLAN: 'endPlanDialog',
  WORKING_AMOUNT_DESC: 'workingAmountDesc',
  RECOVER_PLAN: 'recoverPlanDialog'
}

const recoverPlanDialog = (planDetail, viewControl, { closeRecoverPlanDialog, recoverPlan }) => {
  if (!viewControl[dialogName.RECOVER_PLAN]) {
    return <div />
  }
  const { workingAmount } = planDetail
  const content = `请确保您的信用卡可用额度不低于计划周转金${workingAmount}元。`
  return (
    <EnsureDialog
      content={content}
      negativeText="下次再说"
      positiveText="恢复计划"
      onClickPositive={recoverPlan}
      onClickNegative={closeRecoverPlanDialog}
    />
  )
}

const endPlanDialog = (planDetail, viewControl, { closeEndPlanDialog, endPlan }) => {
  const cardDescription = getTitle(planDetail)
  const content = `结束${cardDescription}的还款计划，将无法恢复计划，是否确定结束计划？`
  if (viewControl[dialogName.END_PLAN]) {
    return (
      <EnsureDialog
        content={content}
        negativeText="不结束"
        positiveText="结束计划"
        onClickPositive={endPlan}
        onClickNegative={closeEndPlanDialog}
      />
    )
  }
}

const workingAmountDesc = (viewControl, { closeWorkingAmountDesc }) => {
  if (viewControl[dialogName.WORKING_AMOUNT_DESC]) {
    return <WorkingAmountDesc close={closeWorkingAmountDesc} />
  }
}

const bottom = ({ recoverEnable, status }, { showEndPlanDialog, showRecoverPlanDialog }) => {
  const style = {
    single: {
      width: ' 3.15rem',
      height: ' 0.48rem',
      background: ' rgba(66, 136, 255, 1)',
      borderRadius: ' 0.04rem',
      marginBottom: ' 0.42rem',
      fontSize: ' 0.15rem',
      textAlign: ' center',
      lineHeight: ' 0.48rem',
      marginLeft: ' auto',
      marginRight: ' auto',
      color: ' rgba(255, 255, 255, 1)'
    },
    double: {
      container: {
        width: '3.25rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: ' space-between',
        marginBottom: ' 0.42rem'
      },
      end: {
        width: '1.48rem',
        height: '0.39rem',
        background: 'rgba(255,255,255,1)',
        border: '0px solid rgba(66,136,255,1)',
        borderRadius: '0.04rem',
        fontSize: '0.14rem',
        color: 'rgba(66,136,255,1)',
        lineHeight: '0.39rem',
        textAlign: 'center'
      },
      recover: {
        width: '1.48rem',
        height: '0.39rem',
        background: 'rgba(66,136,255,1)',
        borderRadius: '0.04rem',
        fontSize: '0.14rem',
        color: 'rgba(255,255,255,1)',
        lineHeight: '0.39rem',
        textAlign: 'center'
      }
    }
  }
  if (status === PLAN_STATUS.PAUSED) {
    if (!recoverEnable) {
      return (
        <div onClick={showEndPlanDialog} style={style.single}>
          结束计划
        </div>
      )
    } else {
      return (
        <div style={style.double.container}>
          <div style={style.double.end} onClick={showEndPlanDialog}>
            结束计划
          </div>
          <div style={style.double.recover} onClick={showRecoverPlanDialog}>
            恢复计划
          </div>
        </div>
      )
    }
  }
}

const renderDisplay = (planDetail, showWorkingAmountDesc) => {
  const repayCount = (planDetail.tasks || []).filter(({ type }) => type === TASK_TYPE.REPAY).length
  const { totalAmount, workingAmount, payCostTotal } = planDetail
  return (
    <div id="display">
      <div id="amount" className="left">
        <div className="img">
          <img className="center" src={require('./assets/amount.png')} alt="" />
        </div>
        <div className="title_content">
          <div className="title">账单金额</div>
          <div className="content">
            {totalAmount}
            <span>元</span>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
      <div id="working_amount" className="right">
        <div className="img">
          <img className="center" alt="" src={require('./assets/working_amount.png')} />
        </div>
        <div className="title_content">
          <div className="title">
            周转金
            <img alt="" onClick={showWorkingAmountDesc} src={require('./assets/question.png')} />
          </div>
          <div className="content">
            {workingAmount}
            <span>元</span>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
      <div id="repay_fee" className="left">
        <div className="img">
          <img className="center" alt="" src={require('./assets/repay_fee.png')} />
        </div>
        <div className="title_content">
          <div className="title">还款手续费</div>
          <div className="content">
            {payCostTotal}
            <span>元</span>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
      <div id="repay_count" className="right">
        <div className="img">
          <img className="center" alt="" src={require('./assets/repay_count.png')} />
        </div>
        <div className="title_content">
          <div className="title">还款笔数</div>
          <div className="content">
            {repayCount}
            <span>笔</span>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </div>
  )
}

const renderSummary = planDetail => {
  return (
    <div className="plan-detail-summary plan-detail-card">
      <div className="form bottom-gray">
        <div className="title">计划单号</div>
        <div className="content normal">{planDetail.planId}</div>
      </div>
      <div className="form bottom-gray">
        <div className="title">还款天数</div>
        <div className="content normal">{planDetail.planLength || 0}天</div>
      </div>
      <div
        className={(() => {
          if (planDetail.status === PLAN_STATUS.SUCCESSFUL) {
            return 'form'
          }
          return 'form bottom-gray'
        })()}
      >
        <div className="title">计划状态</div>
        <div
          className={(() => {
            if (
              planDetail.status === PLAN_STATUS.PAUSED ||
              planDetail.status === PLAN_STATUS.FAILED
            ) {
              return 'content red'
            }
            if (
              planDetail.status === PLAN_STATUS.RUNNING ||
              planDetail.status === PLAN_STATUS.SUCCESSFUL
            ) {
              return 'content blue'
            }
            return 'content normal'
          })()}
        >
          {PLAN_STATUS_DESC[planDetail.status]}
        </div>
      </div>
      {(() => {
        if (!planDetail.refund && !planDetail.tail) {
          return <div />
        }
        return (
          <div className="form">
            <div className="title">
              {(() => {
                if (planDetail.refund) {
                  if (planDetail.refund.done) {
                    return '退款金额'
                  }
                  return '退款中'
                }
                return '周转余额'
              })()}
            </div>
            <div className="content normal">
              {(() => {
                if (planDetail.refund) {
                  return `${planDetail.refund.amount || 0.0}元`
                }
                return `${planDetail.tail || 0.0}元`
              })()}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export class PlanDetail extends Component {
  constructor() {
    super()
    this.state = {
      planDetail: {},
      loading: false,
      viewControl: {
        [dialogName.END_PLAN]: false,
        [dialogName.RECOVER_PLAN]: false,
        [dialogName.WORKING_AMOUNT_DESC]: false
      }
    }
    const switchDialog = dialogName => visibility => () => {
      const viewControl = this.state.viewControl
      viewControl[dialogName] = visibility
      this.setState(viewControl)
    }
    const showRecoverPlanDialog = switchDialog(dialogName.RECOVER_PLAN)(true)
    const closeRecoverPlanDialog = switchDialog(dialogName.RECOVER_PLAN)(false)
    const showEndPlanDialog = switchDialog(dialogName.END_PLAN)(true)
    const closeEndPlanDialog = switchDialog(dialogName.END_PLAN)(false)
    const showWorkingAmountDesc = switchDialog(dialogName.WORKING_AMOUNT_DESC)(true)
    const closeWorkingAmountDesc = switchDialog(dialogName.WORKING_AMOUNT_DESC)(false)
    this.handlers = {
      showRecoverPlanDialog,
      closeRecoverPlanDialog,
      showEndPlanDialog,
      closeEndPlanDialog,
      showWorkingAmountDesc,
      closeWorkingAmountDesc
    }

    this.handlers.endPlan = async () => {
      this.toggleLoading()
      const planId = prepareData.planId || this.props.location.query.planId
      try {
        const { retMsg } = await post({
          url: 'v2/plan/user/end',
          data: {
            planId
          }
        })
        toastIt(retMsg)
        closeEndPlanDialog()
        this.toggleLoading()
        this.loadPlanDetail({ planId })
      } catch (error) {
        toastIt(error)
        closeEndPlanDialog()
        this.toggleLoading()
      }
    }
    this.handlers.recoverPlan = async () => {
      this.toggleLoading()
      const planId = prepareData.planId || this.props.location.query.planId
      try {
        const { retMsg } = await post({
          url: 'v2/plan/user/recover',
          data: {
            planId
          }
        })
        toastIt(retMsg)
        closeRecoverPlanDialog()
        this.toggleLoading()
        this.loadPlanDetail({ planId })
      } catch (error) {
        toastIt(error)
        closeRecoverPlanDialog()
        this.toggleLoading()
      }
    }
  }
  toggleLoading = () => {
    const { loading } = this.state
    this.setState({
      loading: !loading
    })
  }
  async loadPlanDetail({ planId }) {
    this.toggleLoading()
    try {
      const data = await get({
        url: 'v2/plan/detail',
        data: {
          planId
        }
      })
      if (data.data.group.length > 0) {
        this.setState({
          planDetail: data.data
        })
      } else {
        toastIt(data.retMsg)
      }
      this.toggleLoading()
    } catch (error) {
      toastIt('出错了')
      this.toggleLoading()
    }
  }
  componentDidMount() {
    this.loadPlanDetail(prepareData)
    document.getElementsByTagName('body')[0].style.background = '#F1F1F1'
  }
  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.background = 'white'
  }
  render() {
    const planDetail = this.state.planDetail
    const viewControl = this.state.viewControl
    return (
      <div style={{ background: '#F1F1F1', height: '100%' }}>
        {createHeader({
          onClickBack: () => {
            if (typeof prepareData.next === 'undefined') {
              window.getLoadData.finishTist()
            } else {
              window.getLoadData.jump(prepareData.next)
            }
          },
          title: getTitle(planDetail)
        })}
        <div className="header-expand" />
        <div id="detail-display">
          <PausedInfo
            status={planDetail.status}
            pauseReason={planDetail.pauseReason}
            pauseSms={planDetail.pauseSms}
          />
          {renderSummary(planDetail)}
          {renderDisplay(planDetail, this.handlers.showWorkingAmountDesc)}
          {planDetail.group && (
            <div id="tasks" className={style.wrap}>
              {planDetail.group.map(v => (
                <Schedule info={v} key={v.date} />
              ))}
            </div>
          )}
        </div>
        {bottom(planDetail, this.handlers)}
        {workingAmountDesc(viewControl, this.handlers)}
        {endPlanDialog(planDetail, viewControl, this.handlers)}
        {recoverPlanDialog(planDetail, viewControl, this.handlers)}
        {this.state.loading && <Loader />}
      </div>
    )
  }
}
