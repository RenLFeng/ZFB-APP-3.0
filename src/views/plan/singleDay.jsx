import React, { Component } from 'react'
import { merge } from '../../core/objectExtension'
import { TASK_STATUS, TASK_TYPE } from '../../core/plan/display'
import { Arrow } from './arrow'

export class SingleDayTasks extends Component {
  constructor(props) {
    super(props)
    this.state = { expand: false }
    this.generateSummaryOfThisDay = tasks => {
      const toPay = ({ status, type }) =>
        (TASK_STATUS.FAILED !== status || TASK_STATUS.SUCCESSFUL !== status) && TASK_TYPE.PAY === type
      const toRepay = ({ status, type }) =>
        (TASK_STATUS.FAILED !== status || TASK_STATUS.SUCCESSFUL !== status) && TASK_TYPE.REPAY === type
      const paid = ({ status, type }) =>
        TASK_STATUS.SUCCESSFUL === status && TASK_TYPE.PAY === type
      const repaid = ({ status, type }) =>
        TASK_STATUS.SUCCESSFUL === status && TASK_TYPE.REPAY === type
      const { length: paidCount } = tasks.filter(paid)
      const { length: repaidCount } = tasks.filter(repaid)
      const { length: toPayCount } = tasks.filter(toPay)
      const { length: toRepayCount } = tasks.filter(toRepay)
      if (paidCount || repaidCount) {
        return `已消费${paidCount}笔 已还款${repaidCount}笔`
      }
      return `${toPayCount}笔消费 ${toRepayCount}笔还款`
    }
  }

  render() {
    const { singleDay } = this.props
    const taskAmount = ({ amount }) => {
      return `${amount} 元`
    }
    const taskDescribe = ({ type, status }) => {
      if (type === TASK_TYPE.PAY) {
        if (status === TASK_STATUS.SUCCESSFUL) {
          return '消费成功'
        }
        if (status === TASK_STATUS.READY || status === TASK_STATUS.RUNNING) {
          return (
            <span>未消费<span style={{ width: '1em', height: '1em', visibility: 'hidden' }}>啊</span></span>
          )
        }
        if (status === TASK_STATUS.FAILED) {
          return '消费失败'
        }
      }
      if (type === TASK_TYPE.REPAY) {
        if (status === TASK_STATUS.SUCCESSFUL) {
          return '还款成功'
        }
        if (status === TASK_STATUS.READY || status === TASK_STATUS.RUNNING) {
          return (
            <span>未还款<span style={{ width: '1em', height: '1em', visibility: 'hidden' }}>啊</span></span>
          )
        }
        if (status === TASK_STATUS.FAILED) {
          return '还款失败'
        }
      }
    }
    const taskTime = ({ toExecuteTime: ts }) => {
      const d = new Date(ts)
      const fix = number => [number < 10 ? '0' : '', number].join('')
      return [d.getHours(), d.getMinutes()].map(fix).join(':')
    }
    const floatRight = {
      float: 'right',
      marginRight: '0.16rem'
    }
    const floatLeft = {
      float: 'left',
      marginLeft: '0.16rem'
    }
    const amount = {
      marginLeft: '0.1rem'
    }
    return (
      <div style={this.style(singleDay).container}>
        <div
          style={this.style(singleDay).head}
          onClick={() => {
            this.setState({ expand: !this.state.expand })
          }}
        >
          <div style={this.style(singleDay).circle} />
          <div style={this.style(singleDay).date}>{singleDay.date}</div>
          <div style={this.style(singleDay).summary}>
            {this.generateSummaryOfThisDay(singleDay.tasks || [])}
          </div>
          <div style={this.style(singleDay).arrow}>
            <Arrow expand={this.state.expand}></Arrow>
          </div>
          {(show => {
            if (!show) {
              return <div style={this.style(singleDay).verticalLineUp} />
            }
          })(this.props.first)}
          {(show => {
            if (!show) {
              return <div style={this.style(singleDay).verticalLineDown} />
            }
          })(this.props.last)}
        </div>
        {((tasks, expand) => {
          if (!expand) {
            return ''
          }
          return tasks.map((task, index, array) => (
            <div key={task.order} style={this.taskItemStyle(this.props.last)}>
              <div
                style={merge(
                  this.taskStyle(task, index === array.length - 1),
                  floatLeft
                )}
              >
                {taskDescribe(task)}
              </div>
              <div
                style={merge(
                  this.taskStyle(task, index === array.length - 1),
                  floatLeft,
                  amount
                )}
              >
                {taskAmount(task)}
              </div>
              <div
                style={merge(
                  this.taskStyle(task, index === array.length - 1),
                  floatRight
                )}
              >
                {taskTime(task)}
              </div>
              <div style={{ clear: 'both' }} />
            </div>
          ))
        })(singleDay.tasks, this.state.expand)}
        {(last => {
          if (!last) {
            return <div style={this.style(singleDay).bottom} />
          }
        })(this.props.last)}
      </div>
    )
  }

  taskItemStyle(hideLeftSide) {
    if (hideLeftSide) {
      return { marginLeft: '0.17rem' }
    } else {
      return { marginLeft: '0.17rem', borderLeft: '1px solid #E5E5E5' }
    }
  }

  taskStyle({ type, status }, last) {
    const base = {
      height: '0.14rem',
      fontSize: '0.14rem',
      lineHeight: '0.16rem'
    }
    if (!last) {
      base.marginBottom = '0.12rem'
    } else {
      base.marginBottom = '0.2rem'
    }
    if (status === TASK_STATUS.SUCCESSFUL) {
      if (type === TASK_TYPE.PAY) {
        return merge(base, {
          color: '#4288FF'
        })
      }
      if (type === TASK_TYPE.REPAY) {
        return merge(base, {
          color: '#1DA64D'
        })
      }
    }
    if (status === TASK_STATUS.READY || status === TASK_STATUS.RUNNING) {
      return merge(base, {
        color: '#999999'
      })
    }
    if (status === TASK_STATUS.FAILED) {
      return merge(base, {
        color: '#FC4E4E'
      })
    }
  }

  style(singleDay) {
    const centerY = {
      top: '50%',
      position: 'absolute',
      transform: 'translateY(-50%)'
    }
    return {
      container: {
        position: 'relative'
      },
      bottom: {
        width: '2.95rem',
        height: '0.01rem',
        background: 'rgba(229,229,229,1)',
        marginLeft: '0.35rem'
      },
      head: {
        height: '0.52rem',
        position: 'relative'
      },
      verticalLineUp: {
        left: '0.17rem',
        top: '-1px',
        position: 'absolute',
        height: '0.21rem',
        background: 'rgba(229,229,229,1)',
        width: '1px'
      },
      verticalLineDown: {
        left: '0.17rem',
        bottom: '-1px',
        position: 'absolute',
        height: '0.21rem',
        background: 'rgba(229,229,229,1)',
        width: '1px'
      },
      summary: merge(
        {
          fontSize: '0.13rem',
          color: 'rgba(102,102,102,1)',
          right: '0.35rem'
        },
        centerY
      ),
      arrow: merge({
        width: ' 0.13rem',
        height: ' 0.13rem',
        fontSize: ' 0',
        right: ' 0.15rem'
      }, centerY),
      date: merge(
        {
          fontSize: '0.15rem',
          color: 'rgba(0,0,0,1)',
          left: '0.35rem'
        },
        centerY
      ),
      circle: (tasks => {
        const circle = merge(
          {
            left: '0.15rem',
            width: '0.05rem',
            height: '0.05rem',
            borderRadius: '50%'
          },
          centerY
        )
        if (tasks.some(({ status }) => status === TASK_STATUS.FAILED)) {
          return merge({ background: 'rgba(252,78,78,1)' }, circle)
        }
        if (tasks.every(({ status }) => status === TASK_STATUS.SUCCESSFUL)) {
          return merge({ background: 'rgba(66,136,255,1)' }, circle)
        }
        return merge({ background: 'rgba(204,204,204,1)' }, circle)
      })(singleDay.tasks || [])
    }
  }
}