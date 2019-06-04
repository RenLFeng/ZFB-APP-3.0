import React, { Component } from 'react'
import '../../assets/css/common.css'
import '../../assets/css/header.css'
import '../../assets/css/myAccount.css'
import { post } from '../../store/requestFacade'
import Empty from '../Empty/index'
import Header from '../../components/Header/index'
import css from './myAccount.module.scss'
import { accessList } from '../../public/constant'
import Arrow from '../../components/UI/arrow/index'
import Loader from '../../components/Loader/index'
import dayjs from 'dayjs'
import { CashWithdrawalMAP } from './map'

export default class myAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      monthEarnings: 0,
      withdrawData: [],
      profitList: [],
      list: accessList({}),
      restMoney: 0,
      currentTab: 'in',
      loaderStatus: true,
      CashList: {},
      hadWithdraw: true
    }
  }
  handleGoBack = () => {
    window.getLoadData.finishTist()
  }
  handleItemsGoBack = () => {
    this.props.history.push({
      pathname: 'myAccount'
    })
  }
  handleJumpDetails = v => {
    this.props.history.push({
      pathname: 'AccountDetails',
      query: {
        type: v.type,
        title: v.item,
        goback: this.handleItemsGoBack,
        api: v.api,
        statisticsType: v.statisticsType
      }
    })
  }
  handleChangeItem = param => {
    const { currentTab } = this.state
    if (currentTab !== param) {
      this.setState({
        currentTab: param
      })
      if (param === 'out') {
        this.getWithdrawData()
      }
    }
  }
  // 账户余额
  gettotalEarnings = async () => {
    try {
      const res = await post({
        url: 'user/info/detail'
      })
      return res.data.balance
    } catch (error) {
      console.log(error)
    }
  }
  // 本月总收益
  getmonthProfit = async () => {
    try {
      const res = await post({
        url: 'profit/monthProfit'
      })
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  // 7个收益明细
  getProfitList = async () => {
    try {
      const res = await post({
        url: '/profit/earnings'
      })
      if (res.retCode) {
        console.log('7个收益明细 res: ', res)
        return res.data // obj
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 体现明细
  getWithdrawData = async () => {
    try {
      const res = await post({
        url: 'wallet/withdraw/query',
        data: {
          pageNumber: 1,
          pageSize: 100
        }
      })
      if (res.data.rows.length === 0) {
        this.setState({
          hadWithdraw: false
        })
      }
      const rowList = res.data.rows.map(v => ({
        ...v,
        month: dayjs(v.withdrawDate).format('YYYY-MM')
      }))
      let keyOfTime = [...new Set(rowList.map(v => v.month))].sort().reverse()
      const obj = keyOfTime.reduce((init, v) => {
        return Object.assign(init, { [v]: [...rowList.filter(a => a.month === v)] })
      }, {})
      this.setState({
        CashList: obj
      })
    } catch (error) {
      console.log(error)
    }
  }
  fetchAll = async () => {
    const ProfitList = this.getProfitList()
    const monthEarnings = this.getmonthProfit()
    const restMoney = this.gettotalEarnings()
    return {
      ProfitList: await ProfitList,
      monthEarnings: await monthEarnings,
      restMoney: await restMoney
    }
  }
  init = async () => {
    try {
      const result = await this.fetchAll()
      console.log('init result: ', JSON.stringify(result))
      this.setState({
        profitList: result.ProfitList,
        list: accessList(result.ProfitList),
        restMoney: result.restMoney, // 账户余额
        monthEarnings: result.monthEarnings, // 本月收益
        loaderStatus: false
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentWillMount() {
    this.init()
  }
  render() {
    const {
      list,
      monthEarnings,
      restMoney,
      currentTab,
      loaderStatus,
      CashList,
      hadWithdraw
    } = this.state
    return (
      <div className={css.myAccount}>
        <div>
          <Header
            title="我的账户"
            handleGoBack={this.handleGoBack}
            whiteArrow
            color="#fff"
            backgroundColor="#0075c1"
          />
        </div>
        <div className={css.outline}>
          <p className={css.title}>账户余额(元)</p>
          <h3 className={css.money}>{restMoney}</h3>
          <p className={css.profit}>本月收益{monthEarnings}元</p>
        </div>
        <div className={css.tabs}>
          <p
            onClick={() => {
              this.handleChangeItem('in')
            }}
            className={currentTab === 'in' ? '' : css.activedTab}
          >
            收益明细
          </p>
          <p
            className={currentTab === 'out' ? '' : css.activedTab}
            onClick={() => {
              this.handleChangeItem('out')
            }}
          >
            提现明细
          </p>
        </div>
        <div className={css.wrap}>
          {currentTab === 'in' &&
            list.map(v => (
              <div className={css.catalog} key={v.item} onClick={() => this.handleJumpDetails(v)}>
                <div className={css.ItemWithImg}>
                  <img src={v.img} alt="" />
                  <p>{v.item}</p>
                </div>
                <div className={css.right}>
                  <div>
                    <p>{v.totalEarnings}元</p>
                    <p>
                      本月收益<i>+{v.thisMonth}元</i>
                    </p>
                  </div>
                  <Arrow />
                </div>
              </div>
            ))}
          {currentTab !== 'in' && (
            <>
              {hadWithdraw ? (
                <>
                  {Object.keys(CashList).map((v, i) => (
                    <div key={i}>
                      <div className={css.monthBar}>{v}</div>
                      {CashList[v].map(a => (
                        <div className={css.outItem} key={a.withdrawId}>
                          <div className={css.left}>
                            <p>-{a.withdrawAmt}</p>
                            <p>{a.bankCard}</p>
                          </div>
                          <div className={css.right}>
                            <p>{CashWithdrawalMAP.get(Number(a.status))}</p>
                            <p>{a.withdrawDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <Empty text="暂无提现记录" />
              )}
            </>
          )}
        </div>
        {loaderStatus && <Loader />}
      </div>
    )
  }
}
