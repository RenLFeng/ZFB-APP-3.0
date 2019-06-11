import React, { Component } from 'react'
import Header from '../../components/Header/index'
import css from './css.module.scss'
import html2canvas from 'html2canvas'
import logoPng from '../../assets/img/logo.png'
import { post } from '../../store/requestFacade'
import { build } from '../../store/qrCode'

export default class index extends Component {
  state = {
    username: '',
    phone: '',
    qrcode: '',
    imgBase64: ''
  }

  getUserinfo = async () => {
    // const prefix = window.location.href.split('share')[0]
    const prefix = window.location.hostname
    const userphone = '/shareRegister?userPhone='
    const username = '&&username='
    try {
      const res = await post({
        url: '/user/invitation'
      })
      const txt = prefix + userphone + res.data.inviteOrganAccount + username + res.data.username
      console.log('txt: ', txt)
      this.setState({
        username: res.data.username,
        phone: res.data.inviteOrganAccount,
        qrcode: await build(txt)
      })
      html2canvas(document.querySelector('#canvas'), { scale: 2 }).then(canvas => {
        this.setState({
          imgBase64: canvas.toDataURL('image/png')
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getUserinfo()
  }
  handleGoBack = () => {
    window.getLoadData.finishTist()
  }

  downloadImage = () => {
    const { imgBase64 } = this.state
    window.getLoadData.accessQRcode(imgBase64)
  }

  render() {
    const { username, phone, qrcode } = this.state
    const number = [...phone]
    return (
      <div className={css.share}>
        <Header
          title="推荐好友"
          handleGoBack={this.handleGoBack}
          whiteArrow
          color="#fff"
          backgroundColor="#0075c1"
        />
        <div className={css.content} id="canvas">
          <div className={css.logo}>
            <img src={logoPng} alt="" />
          </div>
          <h3>好友{username}邀请您加入智付宝</h3>

          <div className={css.card}>
            <h4>推荐码</h4>
            <div className={css.number}>
              {number.map((v, i) => (
                <span key={i}>{v}</span>
              ))}
            </div>
            <h5>邀请的好友可在注册时直接填写邀请码</h5>
            <div className={css.qrcode}>
              <i />
              <img src={qrcode} alt="" />
              <i />
            </div>
            <div className={css.tips}>
              <div className={css.text}>
                <p>1.扫描二维码可注册</p>
                <p>2.输入推荐码也可注册</p>
              </div>
            </div>
          </div>
          <button data-html2canvas-ignore onClick={this.downloadImage}>
            保存图片分享
          </button>
        </div>
      </div>
    )
  }
}
