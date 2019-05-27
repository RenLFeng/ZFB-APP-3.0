import React, { Component } from 'react'
import hehuorenhuankuan from '../../assets/img/hehuorenhuankuan.png'
import hehuorenshoukuan from '../../assets/img/hehuorenshoukuan.png'
import pingtaigouji from '../../assets/img/pingtaigouji.png'
import duankoujihuo from '../../assets/img/duankoujihuo.png'
import { post } from '../../store/requestFacade'
import { cutAmount } from '../../store/filter'
import { Link } from 'react-router-dom'

export default class Returns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ReturnsData: ReturnsData
    }
  }
  LinkTo(type, status) {
    this.props.history.push({
      pathname: 'returnsDetailed',
      type: type,
      status: status
    })
  }
  getEarnings = async () => {
    try {
      const res = await post({
        url: 'profit/earnings'
      })
      // console.log(res)
      this.setState({
        ReturnsData: [
          {
            icon: hehuorenhuankuan,
            title: '设备还款分润',
            amount: res.data.offline_repay.totalEarnings,
            earnings: res.data.offline_repay.monthEarnings,
            type: 1
          },
          {
            icon: hehuorenshoukuan,
            title: '设备收款分润',
            amount: res.data.offline_receipt.totalEarnings,
            earnings: res.data.offline_receipt.monthEarnings,
            type: 1
          },
          {
            icon: pingtaigouji,
            title: '平台购机',
            amount: res.data.buy_pos.totalEarnings,
            earnings: res.data.buy_pos.monthEarnings,
            type: 3
          },
          {
            icon: duankoujihuo,
            title: '激活奖励',
            amount: res.data.activate_pos.totalEarnings,
            earnings: res.data.activate_pos.monthEarnings,
            type: 3
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    this.getEarnings()
  }
  render() {
    return (
      <ul style={ReturnsUl}>
        {this.state.ReturnsData.map((item, index) => {
          return (
            <Link to={`/returnsDetailed?type=${item.type}`} key={index}>
              <li style={ReturnsLi}>
                <div style={{ position: 'relative' }}>
                  <img style={Returnsicon} src={item.icon} alt="" />
                  <span
                    style={{
                      fontSize: '0.15rem',
                      fontWeight: 'bold',
                      marginLeft: '0.3rem'
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <div style={ReturnsLiright}>
                  <div style={{ textAlign: 'right', marginRight: '0.13rem' }}>
                    <p style={{ fontSize: '0.18rem' }}>{cutAmount(item.amount)}</p>
                    <p>
                      本月收益
                      <span style={{ color: '#fc4e4e' }}>+{cutAmount(item.earnings)}</span>
                    </p>
                  </div>
                  <img
                    style={{ width: '0.06rem', height: '0.12rem' }}
                    src={require('../../assets/img/jiantou_xiangyou.png')}
                    alt=""
                  />
                </div>
              </li>
            </Link>
          )
        })}
      </ul>
    )
  }
}
const ReturnsData = [
  {
    icon: hehuorenhuankuan,
    title: '设备还款分润',
    amount: '0.00',
    earnings: '0.00',
    type: 0,
    status: 1
  },
  {
    icon: hehuorenshoukuan,
    title: '设备收款分润',
    amount: '0.00',
    earnings: '0.00',
    type: 0,
    status: 2
  },
  // {
  //   icon: viphuankuan,
  //   title: '快捷还款分润',
  //   amount: '1,112.00',
  //   earnings: '16.23',
  //   type: 1,
  //   status: 1
  // },
  // {
  //   icon: vipshoukuan,
  //   title: '快捷收款分润',
  //   amount: '1,112.00',
  //   earnings: '16.23',
  //   type: 1,
  //   status: 2
  // },
  {
    icon: pingtaigouji,
    title: '平台购机',
    amount: '0.00',
    earnings: '0.00',
    type: 2,
    status: 1
  },
  {
    icon: duankoujihuo,
    title: '激活奖励',
    amount: '0.00',
    earnings: '0.00',
    type: 2,
    status: 2
  }
  // {
  //   icon: shuakajiangli,
  //   title: '推广奖励',
  //   amount: '1,112.00',
  //   earnings: '16.23',
  //   type: 2,
  //   status: 3
  // },
]
const ReturnsUl = {
  padding: '0 0.15rem'
}
const ReturnsLi = {
  height: '0.77rem',
  borderBottom: '0.01rem solid #e5e5e5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}
const Returnsicon = {
  position: 'absolute',
  width: '0.2rem',
  height: '0.19rem'
}
const ReturnsLiright = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}
