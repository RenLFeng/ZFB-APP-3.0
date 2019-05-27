import React, {Component} from 'react'
import '../../assets/css/common.css'
import '../../assets/css/MyReward.css'
import { post } from '../../store/requestFacade'
class Registered extends Component {
  constructor () {
    super ()
    this.state = {
      registeredData:[]
    }
  }
  async getRegisterInfo () {
    try {
      const res = await post ({
        url:'coupon/user/personal'

      })
      this.setState({
        registeredData:res.data.rows
      })
    }catch (err) {
      console.log(err)
    }
  }
  componentDidMount() {
    this.getRegisterInfo()
  }
  render () {
    return (
      <div>
        <h2 className='registered-h2'>
          <p>会员</p>
          <p>现金红包</p>
        </h2>
        <div className="registeredCon">
          {
            this.state.registeredData.map( (item,index) =>{
              return (
                <div className='register-user' key={index}>
                  <p>{item.sourceUseraccount}</p>
                  <p className='register-red-envelope'>+0.00</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default Registered