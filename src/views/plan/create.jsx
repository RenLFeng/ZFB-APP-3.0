import React, { Component } from 'react'
import { createHeader } from '../../components/header'
import { parseURL } from '../../store/URL'
import { merge } from '../../core/objectExtension'
import '../../assets/css/reset.css'
import { RATIO } from '../../core/plan/ratio'

const getTitle = ({ bankName, cardNo }) => {
  if (!bankName || bankName.length < 0 || !cardNo || cardNo.length < 0) {
    return ''
  }
  return `${bankName}(${cardNo.substr(cardNo.length - 4, 4)})`
}

const prepareData = (() => {
  const { search } = window.location
  const {
    cardNo,
    bankName,
    repayDate,
    billDate,
    merchantArea,
    channelId,
    channelName,
    payRate,
    repayFee,
    dayPayLimit,
    dayRepayLimit,
    singlePayLimit,
    singleRepayLimit
  } = parseURL(decodeURI(search))
  return {
    cardNo,
    bankName,
    repayDate,
    billDate,
    merchantArea,
    channelId,
    channelName,
    payRate,
    repayFee,
    dayPayLimit,
    dayRepayLimit,
    singlePayLimit,
    singleRepayLimit
  }
})()

export class CreatePlan extends Component {
  constructor() {
    super()
    this.handlers = {
      amountChange: event => {
        const { conditions } = this.state
        conditions.amount = event.nativeEvent.target.value
        this.setState({
          conditions
        })
      },
      ratioChange: ratio => () => {
        const { conditions } = this.state
        conditions.ratio = ratio
        this.setState({
          conditions
        })
      },
      planLengthSelect: planLength => () => {
        const { conditions } = this.state
        conditions.planLength = planLength
        this.setState({
          conditions
        })
      }
    }
    this.state = {
      conditions: {
        amount: 0,
        planLength: 0,
        ratio: 5
      },
      ratios: {
        enable: {
          [RATIO.NORMAL.value]: true,
          [RATIO.DELICATE.value]: true,
          [RATIO.HIGH_QUALITY.value]: true,
        },
        disable: {}
      },
      card: {},
      channel: {},
      dayNumbers: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    }
  }

  componentDidMount() {
    this.setState({
      card: {
        cardNo: prepareData.cardNo,
        bankName: prepareData.bankName,
        billDate: prepareData.billDate,
        repayDate: prepareData.repayDate,
        merchantArea: prepareData.merchantArea
      },
      channel: {
        channelId: prepareData.channelId,
        channelName: prepareData.channelName,
        payRate: prepareData.payRate,
        repayFee: prepareData.repayFee,
        dayPayLimit: prepareData.dayPayLimit,
        dayRepayLimit: prepareData.dayRepayLimit,
        singlePayLimit: prepareData.singlePayLimit,
        singleRepayLimit: prepareData.singleRepayLimit
      }
    })
    this.init()
  }

  init() {
  }

  render() {
    return (
      <div style={style.body}>
        {createHeader({
          onClickBack: () => {},
          title: getTitle(this.state.card || {})
        })}
        <div style={style.head.extension} />
        {createCardAndChannel(
          this.state.card || {}
        )}
        {createMakePlan(
          this.state.channel || {},
          this.state.dayNumbers || [],
          this.state.conditions || {},
          this.state.ratios || {},
          this.handlers || {}
        )}
        <div style={style.makePlan.submit}>制定计划</div>
      </div>
    )
  }
}

const clearFloat = () => <div style={style.clearFloat} />

export const createCardAndChannel = ({ billDate, repayDate, merchantArea }) => {
  return (
    <div style={style.cardAndChannel}>
      <div style={merge(style.form.line, style.bottomGray)}>
        <div style={merge(style.floatLeft, style.form.title)}>账单日</div>
        <div style={merge(style.floatRight, style.form.content)}>
          {billDate}日
        </div>
        {clearFloat()}
      </div>
      <div style={merge(style.form.line, style.bottomGray)}>
        <div style={merge(style.floatLeft, style.form.title)}>还款日</div>
        <div style={merge(style.floatRight, style.form.content)}>
          {repayDate}日
        </div>
        {clearFloat()}
      </div>
      <div style={merge(style.form.line)}>
        <div style={merge(style.floatLeft, style.form.title)}>商户区域</div>
        <div style={merge(style.floatRight, style.form.content)}>
          {merchantArea}
        </div>
        {clearFloat()}
      </div>
    </div>
  )
}

export const createMakePlan = (
  { payRate, repayFee },
  dayNumbers,
  { amount, ratio },
  { enable },
  { amountChange, ratioChange, planLengthSelect }
) => {
  const renderOptionsStyle = inputRatio => {
    if (!enable[inputRatio]) {
      return style.makePlan.options.disable      
    }
    if (ratio !== inputRatio) {
      return style.makePlan.options.normal
    }
    return style.makePlan.options.selected
  }
  return (
    <div style={style.makePlan.container}>
      <div style={merge(style.form.line, style.bottomGray)}>
        <div style={merge(style.floatLeft, style.form.title)}>账单金额</div>
        <div style={merge(style.floatRight, style.form.content)}>
          <input
            type="number"
            placeholder="请输入账单金额"
            onChange={amountChange}
            style={style.makePlan.amount}
          />
          <span>
            {(amount => {
              if (amount) {
                return '元'
              } else {
                return ''
              }
            })(amount)}
          </span>
        </div>
      </div>
      <div style={merge(style.form.line, style.bottomGray)}>
        <div style={merge(style.floatLeft, style.form.title)}>费率</div>
        <div
          style={merge(style.floatRight, style.form.content)}
        >{`0.${payRate}%+单笔${repayFee}元`}</div>
      </div>
      <div style={merge(style.makePlan.options.container, style.bottomGray)}>
        <div
          onClick={ratioChange(RATIO.NORMAL.value)}
          style={renderOptionsStyle(RATIO.NORMAL.value)}
        >{`${RATIO.NORMAL.value}% ${RATIO.NORMAL.desc}`}</div>
        <div
          onClick={ratioChange(RATIO.DELICATE.value)}
          style={renderOptionsStyle(RATIO.DELICATE.value)}
        >{`${RATIO.DELICATE.value}% ${RATIO.DELICATE.desc}`}</div>
        <div
          onClick={ratioChange(RATIO.HIGH_QUALITY.value)}
          style={renderOptionsStyle(RATIO.HIGH_QUALITY.value)}
        >{`${RATIO.HIGH_QUALITY.value}% ${RATIO.HIGH_QUALITY.desc}`}</div>
      </div>
      <div style={merge(style.form.line)}>
        <div style={merge(style.floatLeft, style.form.title)}>还款天数</div>
        <div style={merge(style.floatRight, style.form.content)}>
          <select>
            {dayNumbers.map(number => (
              <option
                onSelect={planLengthSelect(number)}
                value={number}
                key={number}
              >
                {number}天
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

const style = {
  floatRight: {
    float: 'right'
  },
  floatLeft: {
    float: 'left'
  },
  clearFloat: {
    clear: 'both'
  },
  bottomGray: {
    borderBottom: '1px solid rgba(229,229,229,1)'
  },
  cardAndChannel: {
    width: '3.45rem',
    height: '1.51rem',
    background: 'rgba(255,255,255,1)',
    borderRadius: '0.04rem',
    marginTop: '-0.5rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  form: {
    line: {
      width: '3.15rem',
      height: '0.5rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    title: {
      height: '0.12rem',
      fontSize: '0.13rem',
      fontWeight: '500',
      color: 'rgba(153,153,153,1)',
      lineHeight: '0.5rem'
    },
    content: {
      height: '0.12rem',
      fontSize: '0.13rem',
      fontWeight: '500',
      color: 'rgba(51,51,51,1)',
      lineHeight: '0.5rem'
    }
  },
  makePlan: {
    amount: {
      width: '1rem',
      textAlign: 'right'
    },
    container: {
      marginTop: '0.15rem',
      width: '3.45rem',
      height: '2.52rem',
      background: 'rgba(255,255,255,1)',
      borderRadius: '0.04rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    options: {
      container: {
        width: '3.15rem',
        marginTop: '0.15rem',
        paddingBottom: '0.15rem',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-around'
      },
      selected: {
        width: '0.9rem',
        height: '0.26rem',
        background: 'rgba(66,136,255,1)',
        borderRadius: '0.04rem',
        fontSize: '0.12rem',
        fontWeight: '500',
        color: 'rgba(255,255,255,1)',
        lineHeight: '0.26rem',
        paddingLeft: '0.08rem'
      },
      normal: {
        width: '0.9rem',
        height: '0.26rem',
        border: '1px solid rgba(66,136,255,1)',
        borderRadius: '0.04rem',
        fontSize: '0.12rem',
        fontWeight: '500',
        color: 'rgba(66,136,255,1)',
        lineHeight: '0.26rem',
        paddingLeft: '0.08rem'
      },
      disable: {
        width: '0.9rem',
        height: '0.26rem',
        background: 'rgba(204,204,204,1)',
        borderRadius: '0.04rem',
        fontSize: '0.12rem',
        fontWeight: '500',
        color: 'rgba(255,255,255,1)',
        lineHeight: '0.26rem',
        paddingLeft: '0.08rem'
      }
    },
    submit: {
      width: '3.15rem',
      height: '0.48rem',
      background: 'rgba(66,136,255,1)',
      borderRadius: '0.04rem',
      color: 'white',
      position: 'fixed',
      bottom: '0.2rem',
      left: '50%',
      transform: 'translate(-50%)',
      textAlign: 'center',
      lineHeight: '0.48rem'
    }
  },
  head: {
    extension: {
      width: '3.75rem',
      height: '0.67rem',
      background: 'rgba(66,136,255,1)'
    }
  },
  body: {
    background: '#F1F1F1',
    height: '100%'
  }
}
