import React, {Component} from 'react'
import '../../assets/css/common.css'
import '../../assets/css/MyReward.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'

class Used extends Component {
  constructor (props) {
    super (props)
    this.state = {
      usedData:[],
      usedSum:''
    }
  }
  async getUsedSum() {
    try {
      const res = await post({
        url: 'coupon/user/sum',
        data: {
          couponStatus:2
        }
      })
      this.setState ({
        usedSum: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  async getUsedInfo () {
    try {
      const res = await post ({
        url:'coupon/user/personal',
        data:{
          couponStatus:2
        }
      })
      console.log(res.data.rows)
      this.setState({
        usedData:res.data.rows
      })
    }catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getUsedInfo()
    this.getUsedSum()
  }
  render () {
    return (
      <div>
        <p className='active-red-envelope'>已使用奖励金：{cutAmount(this.state.usedSum)}元</p>
        <h2 className='Activated-h2'>
          <p>会员</p>
          <p>奖励金</p>
          <p>状态</p>
        </h2>
        <div className="usedCon">
          {
            this.state.usedData.map( (item,index) => {
              return (
                <div className='Activated-user' key={index}>
                  <p>{item.sourceUseraccount}</p>
                  <p className='Activated-red-envelope'>+{cutAmount(item.rewardValue)}</p>
                  <p className='Activated-status'>已使用</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Used