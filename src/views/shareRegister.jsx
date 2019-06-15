import React, { Component } from 'react'
import '../assets/css/common.css'
import '../assets/css/shareRegister.css'
import { parseURL } from '../store/URL'
import { Link } from 'react-router-dom'
import { post } from '../store/requestFacade'
import { toastIt } from '../components/popup'
let title=document.querySelector('title');
// title.innerHTML='邀请你开启智付宝'
class ShareRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      code: '',
      password: '',
      confirmPassword: '',
      isClickable: true,
      getVerification: '获取',
      downloadLink: ''
    }
    this.getVerificationCode = this.getVerificationCode.bind(this)
    this.register = this.register.bind(this)
    this.goLink = this.goLink.bind(this)
  }
  // 获取验证码
  async getVerificationCode() {
    if (this.state.mobile === '') {
      toastIt('手机号不能为空')
    } else if (!/^1[345789]\d{9}$/.test(this.state.mobile)) {
      toastIt('手机号格式不对')
    } else {
      this.countDown(59)
      try {
        const res = await post({
          url: 'msg/sms/register',
          data: {
            phone: this.state.mobile
          }
        })
        console.log(res)
        if (res.retCode === '0000') {
          this.setState({ isClickable: false })
        } else {
          toastIt(res.retMsg)
          this.setState({
            isClickable: true,
            getVerification: '获取'
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // 倒计时
  countDown(count) {
    const timer = setInterval(() => {
      this.setState({
        isClickable: false,
        getVerification: count-- + 's'
      })
      if (count === 0) {
        clearInterval(timer)
        this.setState({
          isClickable: true,
          getVerification: '获取'
        })
      }
    }, 1000)
  }
  //  点击注册
  async register() {
    const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (this.state.mobile === '') {
      toastIt('手机号不能为空')
    } else if (!/^1[345789]\d{9}$/.test(this.state.mobile)) {
      toastIt('手机号格式不对')
    } else if (this.state.code === '') {
      toastIt('验证码不能为空')
    } else if (this.state.password === '') {
      toastIt('密码不能为空')
    } else if (!pwdReg.test(this.state.password)) {
      toastIt('密码格式错误')
    } else if (this.state.confirmPassword === '') {
      toastIt('确认密码不能为空')
    } else if (this.state.confirmPassword !== this.state.password) {
      toastIt('确认密码与密码不一致!')
    } else {
      try {
        const res = await post({
          url: 'user/register',
          data: {
            phone: this.state.mobile,
            loginPwd: this.state.password,
            validCode: this.state.code,
            invitePhone: this.userPhone
          }
        })
        if (res.retCode === '0000') {
          toastIt(res.retMsg)
          setTimeout(() => {
            window.location.href = this.state.downloadLink
          }, 1000)
        } else {
          toastIt(res.retMsg)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  /**
   * 可以认为相当于是Vue中的created方法
   * 这个方法只会执行一次，一般在这个生命周期钩子中
   */
  componentWillMount() {
    const urlData = this.props.location.search
    this.userPhone = parseURL(urlData).userPhone
    this.username = parseURL(decodeURI(urlData)).username
    this.getDownloadLink()
  }

  // 获取下载地址
  async getDownloadLink() {
    try {
      const res = await post({
        url: 'user/info/newestVersion'
      })
      this.setState({
        downloadLink: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  getmobile(e) {
    this.setState({
      mobile: e.target.value.replace(/[^\d]/g, '')
    })
  }
  getCode(e) {
    this.setState({
      code: e.target.value.replace(/[^\w]/g, '')
    })
  }
  getPassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  getconfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    })
  }
  goLink() {
    window.location.href = 'https://dibaqu.com/SZZX'
  }
  render() {
    return (
      <div className="share">
        <p className="referrer">
          推荐人： <span className="name">{this.username} </span>
          <span className="telphone"> {this.userPhone}</span>
        </p>
        <div className="form">
          <div className="row">
            <label className="label" htmlFor="mobile">
              手机号
            </label>
            <input
              type="tel"
              placeholder=" 请输入手机号"
              maxLength="11"
              onChange={this.getmobile.bind(this)}
              value={this.state.mobile}
            />
          </div>
          <div className="row">
            <label className="label">验证码</label>
            <input
              type="text"
              placeholder=" 请输入验证码"
              onChange={this.getCode.bind(this)}
              value={this.state.code}
              maxLength="6"
            />
            <button
              className="getyzm"
              id="getyzm"
              onClick={this.getVerificationCode}
              disabled={!this.state.isClickable}
            >
              {this.state.getVerification}
            </button>
          </div>
          <div className="row">
            <label className="label">密码</label>
            <input
              type="password"
              placeholder=" 请输入密码（6-16位字母与数字组合"
              onChange={this.getPassword.bind(this)}
              value={this.state.password}
              maxLength="16"
            />
          </div>
          <div className="row">
            <label className="label">确认密码</label>
            <input
              type="password"
              placeholder=" 请确认密码（6-16位字母与数字组合"
              onChange={this.getconfirmPassword.bind(this)}
              value={this.state.confirmPassword}
              maxLength="16"
            />
          </div>
          <button className="registerBtn" onClick={this.register}>
            注册
          </button>
        </div>
        <div className="xieyi">
          <input name="agreement" id="agreement" type="checkbox" checked disabled="disabled" />
          <label className="dealName label" />
          <p className="deal">
            我已阅读并同意
            <Link to="./userAgreement" className="userdeal">
              《用户协议》
            </Link>
          </p>
        </div>
        <p className="downl">
          <span onClick={this.goLink}>下载APP</span>
        </p>
      </div>
    )
  }
  componentWillUnmount(){
    document.querySelector('title').innerHTML='智付宝';
  }
}

export default ShareRegister
