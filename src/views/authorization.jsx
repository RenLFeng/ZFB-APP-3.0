import React, { Component } from 'react'
import '../assets/css/common.css'
import { parseURL } from '../store/URL'
import css from './authorization.module.scss'

class Authorization extends Component {
  state = {
    userPhone: '',
    username: '',
    dataTime: ''
  }
  componentDidMount() {
    const data = this.props.location.search
    const date = parseURL(decodeURI(data)).date
  
    let year = date.substr(0, 4)
    this.setState({
      userPhone: parseURL(data).inviteCode,
      username: parseURL(decodeURI(data)).username,
      dataTime: Number(year) + 1 + date.replace(year, '')
    })
  }

  render() {
    const { userPhone, username, dataTime } = this.state
    return (
      <>
        <div className={css.authorization}>
          <div className={css.textInfo} style={{top:'20vh'}}>
            <p align="center" className={css.biaoti}>
              授权书
            </p>
            <div className={css.txtInfo}>
              <p>
                经认证审核，<span className={css.username}>{username} </span>
                符合我司《合伙人合作协议》准入要求并已通过我司统一培训考核，现授权为三众智享(深圳)科技有限公司认证合伙人，并授权其使用智付宝APP进行合规展业。
              </p>
              <span className={css.theAuto}>
                授权推荐码：<i className={css.phone}>{userPhone}</i>
              </span>
              <p>
                合伙人需遵守国家及人民银行相关法律法规及三众智享营销规范要求合规展业，本授权有效期与被授权人的智付宝APP账户试用期限相同，特此授权!
              </p>
              <p>特别声明：本授权书必须与被授权人账户绑定使用，转载无效，不得影印、涂改、转让。</p>
            </div>
            <div className={css.foot}>
              <p align="right">三众智享(深圳)科技有限公司</p>
              <p align="right">
                授权截止日期：<span className={css.dataTime}>{dataTime}</span>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Authorization
