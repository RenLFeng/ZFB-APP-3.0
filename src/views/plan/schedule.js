import React, { Component } from 'react'
import style from './schedule.module.scss'

import {
  TASK_STATUS as STATUS,
  TASK_TYPE as TYPE,
  TYPE_TEXT,
  STATUS_TEXT
} from '../../core/plan/display'

export default class Schedule extends Component {
  state = {
    OpenStatus: false
  }
  toggleStatus = () => {
    const { OpenStatus } = this.state
    this.setState({
      OpenStatus: !OpenStatus
    })
  }
  render() {
    const { OpenStatus } = this.state
    const { info } = this.props
    const tasksList = info.tasks.map(v => ({
      ...v,
      status: Number(v.status),
      type: Number(v.type)
    }))

    const PAY_NUM = tasksList.filter(v => v.type === TYPE.PAY && v.status === STATUS.SUCCESSFUL)
      .length
    const REPAY_NUM = tasksList.filter(v => v.type === TYPE.REPAY && v.status === STATUS.SUCCESSFUL)
      .length
    const StatusList = tasksList.map(v => v.status)
    const dotColor = StatusList.some(v => v === STATUS.FAILED)
      ? style.redDot
      : StatusList.some(v => v === (STATUS.READY || STATUS.RUNNING))
      ? style.garyDot
      : style.blueDot
    const arrowStyle = OpenStatus ? style.arrowRight : style.arrowDown
    const negativeList = [STATUS.READY, STATUS.RUNNING]
    return (
      <div className={style.cell}>
        <div className={arrowStyle} onClick={this.toggleStatus}>
          <p className={style.inline}>
            <span className={dotColor} />
            {info.date}
          </p>
          <p className={style.statistics}>
            已消费{PAY_NUM}笔 已还款{REPAY_NUM}笔
          </p>
        </div>
        {OpenStatus ? (
          <div className={style.item}>
            {tasksList.map(v => {
              return (
                <div
                  key={v.toExecuteTime}
                  className={
                    negativeList.includes(v.status)
                      ? style.gary
                      : v.status === STATUS.FAILED
                      ? style.red
                      : v.type === TYPE.PAY
                      ? style.blue
                      : style.green
                  }
                >
                  <div className={style.inline}>
                    {negativeList.includes(v.status) ? (
                      <p className={style.textWidth}>
                        {STATUS_TEXT[v.status]}
                        {TYPE_TEXT[v.type]}
                      </p>
                    ) : (
                      <p className={style.textWidth}>
                        {TYPE_TEXT[v.type]}
                        {STATUS_TEXT[v.status]}
                      </p>
                    )}
                    <p>{v.amount}元</p>
                  </div>
                  <p className={style.time}>{v.time}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={style.emtpyItem} />
        )}
      </div>
    )
  }
}
