/*
 * @Author: xuetengfei
 * @Date: 2019-03-07 11:18:41
 * @Last Modified by: xuetengfei
 * @Last Modified time: 2019-03-21 14:57:58
 * 合伙人业绩
 */

import React, { Component } from 'react'
import { PartnerAchievement } from '../../public/constant'
import Header from '../../components/Header/index'
import css from './partner.module.scss'

export default class index extends Component {
  handleGoBack = () => {
    console.log('handle Go Back 2 APP home: ')
    window.getLoadData.gobackToMyRootView()
  }

  handleItemsGoBack = () => {
    this.props.history.push({
      pathname: 'partnerData'
    })
  }

  handleJumpDetails = type => {
    console.log('handleJumpDetails type: ', type)
    this.props.history.push({
      pathname: 'AccountDetails',
      query: { type, goback: this.handleItemsGoBack }
    })
  }

  render() {
    const list = PartnerAchievement()
    return (
      <div className={css.partner}>
        <Header
          title="合伙人业绩"
          handleGoBack={this.handleGoBack}
          blackArrow
          color="#000"
          backgroundColor="#fff"
        />
        {/* {list.map(v => (
          <section key={v.item} onClick={() => this.handleJumpDetails(v.type)}>
            <div className={css.content}>
              <p>{v.item}</p>
              <p>{v.thisMonth}</p>
            </div>
          </section>
        ))} */}
      </div>
    )
  }
}
