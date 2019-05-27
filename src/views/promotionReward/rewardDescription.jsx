import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/common.css'
import Header from '../../components/Header/index'
import css from './reward.module.scss'

class RewardDescription extends Component {
  handleGoBack = () => {
    window.getLoadData.finishTist()
  }
  render() {
    return (
      <div style={{ overflow: 'hidden' }} className={css.layout}>
        <section>
          <Header
            title={''}
            handleGoBack={this.handleGoBack}
            whiteArrow
            color="#fff"
            backgroundColor="#4288FF"
          />
        </section>

        <section>
          <div className={css.rewardCon}>
            <div className={css.body} style={{ marginBottom: '30px' }}>
              <div className={css.left}>
                <h2>
                  <span className={css.smallBar} />
                  推荐奖励
                </h2>
                <p>
                  推荐好友注册并完成实名认证，您获得5元现金红包。好友通过快捷还款累计交易1万元，现金红包激活成为奖励金，激活人数越多，奖励金越多，上不封顶
                </p>
              </div>
              <div className={css.right}>
                <img
                  className={css.divideImg}
                  alt=""
                  src={require('../../assets/img/promotionReward.png')}
                />
              </div>
            </div>
            <div className={css.body}>
              <div className={css.right}>
                <img
                  className={css.divideImg}
                  alt=""
                  src={require('../../assets/img/dividedReward.png')}
                />
              </div>
              <div className={css.left}>
                <h2>
                  <span className={css.smallBar} />
                  分润奖励
                </h2>
                <p>
                  推荐好友，累计5名完成实名认证，您将自动升级为VIP，您可以永久享有下级会员的分润奖励，推荐的下级会员越多，分润越高
                </p>
              </div>
            </div>
            <p className={css.VIP}>VIP分润：日结收益万12</p>
          </div>
        </section>

        <section>
          <div className={css.btns}>
            <Link to="/promotion">
              <div className={css.myreward}>我的推荐奖励</div>
            </Link>
            <Link to="/share">
              <div className={css.remmond}>立即推荐</div>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}
export default RewardDescription
