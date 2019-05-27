import React, { Component } from 'react'
import { withRouter } from 'react-router'
import '../../assets/css/common.css'
import '../../assets/css/MyReward.css'
import { post } from '../../store/requestFacade'
import Registered from './registered'
import Verified from './verified'
import Activated from './activated'
import Used from './used'
import staticize from '../../store/dialog'
import { toastIt } from '../../components/popup'
import { cutAmount } from '../../store/filter'

class MyReward extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      sum: '',
    }
    this.transfer = this.transfer.bind(this)
  }

  tabNav (index) {
    return index === this.state.current ? 'tab-title active' : 'tab-title'
  }

  tabContent (index) {
    return index === this.state.current ? 'tab-content active' : 'tab-content'
  }

  async getRewardBanlance() {
    try {
      const res = await post({
        url: 'coupon/user/sum',
        data: {
          couponStatus: 1
        }
      })
      this.setState ({
        sum: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  async sureToTransfer () {
    try {
      const res = await post ({
        url:'coupon/user/withdraw',
        data:{
          couponCode: 'invite'
        }
      })
      toastIt(res.retMsg)
    } catch (error) {
      console.log(error)
    }
  }
  async transfer () {
    try {
      await staticize({
        title: '',
        message:'确定将当前奖励余额转入账户余额？'
      })
      this.sureToTransfer()
    } catch (error) {
      console.log(error)
    }
    
  }
  componentDidMount () {
    this.getRewardBanlance()
  }
  render() {
    let that = this
    return (
      <div>
        {}
        <div className="rewardRemaining">
          <p className="balance">{cutAmount(this.state.sum)}</p>
          <p className="balanceDescribe">当前奖励余额 (元)</p>
        </div>
        <div>
          <ul className="tab-titles">
            {React.Children.map(this.props.children, (element, index) => {
              return (
                <li
                  onClick={() => {
                    this.setState({ current: index })
                  }}
                  className={that.tabNav(index)}
                >
                  {element.props.name}
                </li>
              )
            })}
          </ul>
          <div>
            {React.Children.map(this.props.children, (element, index) => {
              return (
                <div
                  onClick={() => {
                    this.setState({ current: index })
                  }}
                  className={that.tabContent(index)}
                >
                  {element}
                </div>
              )
            })}
          </div>
        </div>
        <div className="toAccount" onClick={this.transfer}>转入账户余额</div>
      </div>
    )
  }
}
class Tab extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
class TabCon extends Component {
  render() {
    return (
      <div className="container">
        <MyReward>
          <Tab name="已注册">
            <Registered />
          </Tab>
          <Tab name="已认证">
            <Verified />
          </Tab>
          <Tab name="已激活">
            <Activated />
          </Tab>
          <Tab name="已使用">
            <Used />
          </Tab>
        </MyReward>
      </div>
    )
  }
}
export default withRouter(TabCon)
