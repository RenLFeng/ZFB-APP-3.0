import React, { useState } from 'react'
import './index.module.scss'
import { post } from '../../store/requestFacade'

export default function Login(props) {
  // const [id, setId] = useState('15770584383') // 汉寿
  // const [psd, setpsd] = useState('qqq111')
  const [id, setId] = useState('13798367807') 
  const [psd, setpsd] = useState('a123456')
  const handleInputId = event => {
    setId(event.target.value)
  }
  const handlePsd = event => {
    setpsd(event.target.value)
  }
  async function login() {
    console.log('login')
    try {
      const res = await post({
        url: 'user/login',
        data: {
          useraccount: id,
          loginPwd: psd,
          loginType: 1
        }
      })
      console.log(res)
      if (res.retMsg === '成功') {
        localStorage.setItem('token', res.data.token)
        props.history.push({
          pathname: 'myAccount'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h4>account</h4>
      <input type="number" defaultValue={id} onBlur={handleInputId} />
      <h4>password</h4>
      <input type="text" defaultValue={psd} onChange={handlePsd} />
      <div onClick={login} style={{ marginTop: 50, textAlign: 'center', height: '50px' }}>
        submit
      </div>
    </div>
  )
}
