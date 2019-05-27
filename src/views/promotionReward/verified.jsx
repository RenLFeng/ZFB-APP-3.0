import React, {Component} from 'react'
import '../../assets/css/common.css'
import '../../assets/css/MyReward.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'

class Verified extends Component {
  constructor () {
    super ()
    this.state = {
      VerifiedSum:'',
      VerifiedData:[]
    }
  }
  async getVerifiedSum () {
    try {
      const res = await post ({
        url:'coupon/user/sum',
        data:{
          couponStatus:0
        }
      })
      this.setState({
        VerifiedSum:res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getVerifiedInfo () {
    try {
      const res = await post ({
        url:'coupon/user/personal',
        data:{
          couponStatus:0
        }
      })
      this.setState({
        VerifiedData:res.data.rows
      })
    }catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getVerifiedInfo()
    this.getVerifiedSum()
  }
  render () {
    return (
      <div>
        <p className='unActive-red-envelope'>未激活现金红包：{cutAmount(this.state.VerifiedSum)}元</p>
        <h2 className='Verified-h2'>
          <p>会员</p>
          <p>现金红包</p>
          <p>状态</p>
        </h2>
        <div className="verifiedCon">
          {
            this.state.VerifiedData.map( (item,index) => {
              return (
                <div className='Verified-user' key={index}>
                  <p>{item.sourceUseraccount}</p>
                  <p className='Verified-red-envelope'>+{cutAmount(item.rewardValue)}</p>
                  <p className='Verified-status'>未激活</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Verified