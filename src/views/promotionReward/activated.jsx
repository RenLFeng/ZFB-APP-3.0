import React, {Component} from 'react'
import '../../assets/css/common.css'
import '../../assets/css/MyReward.css'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'

class Activated extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activatedData:[],
      Activatedsum:''
    }
  }
  async getActivatedSum() {
    try {
      const res = await post({
        url: 'coupon/user/sum',
        data: {
          couponStatus: 1
        }
      })
      this.setState ({
        Activatedsum: res.data
      })
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  async getActivatedInfo () {
    try {
      const res = await post ({
        url:'coupon/user/personal',
        data:{
          couponStatus:1
        }
      })
      this.setState({
        activatedData:res.data.rows
      })
    }catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getActivatedInfo()
    this.getActivatedSum()
  }
  render () {
    return (
      <div>
        <p className='active-red-envelope'>已激活奖励金：{cutAmount(this.state.Activatedsum)}元</p>
        <h2 className='Activated-h2'>
          <p>会员</p>
          <p>奖励金</p>
          <p>状态</p>
        </h2>
        <div className="activatedCon">
          {
            this.state.activatedData.map( (item,index) => {
              return (
                <div className='Activated-user' key={index}>
                  <p>{item.sourceUseraccount}</p>
                  <p className='Activated-red-envelope'>+{cutAmount(item.rewardValue)}</p>
                  <p className='Activated-status'>已激活</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Activated