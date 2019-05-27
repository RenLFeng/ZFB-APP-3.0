import React, { Component } from 'react'
import { accessVipAchievement } from '../../public/constant'
import Header from '../../components/Header/index'
import css from './css.module.scss'
import { post } from '../../store/requestFacade'
const api = 'onLinePartner/index'
export default class index extends Component {
  state = {
    list: []
  }
  handleGoBack = () => {
    window.getLoadData.gobackToMyRootView()
  }

  handleItemsGoBack = () => {
    this.props.history.push({
      pathname: 'vipData'
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

  getProfitList = async () => {
    try {
      const res = await post({
        // url: '/profit/earnings'
        url: api
      })
      if (res.retCode) {
        console.log('res: ', res)
        this.setState({
          list: accessVipAchievement(res.data)
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getProfitList()
  }

  render() {
    const { list } = this.state
    return (
      <div className={css.vip}>
        <Header
          title="VIP业绩"
          handleGoBack={this.handleGoBack}
          blackArrow
          color="#000"
          backgroundColor="#fff"
        />
        {list.map(v => (
          <section key={v.type} onClick={() => this.handleJumpDetails(v)} className={css.wrap}>
            <div className={css.content}>
              <p>{v.VIPpageTitle}</p>
              <p>{v.thisMonth}</p>
            </div>
          </section>
        ))}
      </div>
    )
  }
}
