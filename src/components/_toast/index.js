import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './toast'
import './toast.css'

const fnConsol = () => {
  // console.log('had create toast dom')
}

const debug = x => {
  // console.log(x)
  return x
}

function createNode() {
  const _div = document.createElement('div')
  document.body.appendChild(_div)
  const notifyRender = ReactDOM.render(<Toast />, _div, fnConsol)
  return {
    addNotice(noticeParameter) {
      return notifyRender.addNotice(debug(noticeParameter))
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(_div)
      document.body.removeChild(_div)
    }
  }
}

let notifyDOM
const noticeFN = (type, content, duration = 2000, onClose) => {
  if (!notifyDOM) notifyDOM = createNode()
  return notifyDOM.addNotice({ type, content, duration, onClose })
}

export default {
  info(content, duration, onClose) {
    return noticeFN('info', content, duration, onClose)
  },
  success(content = '操作成功', duration, onClose) {
    return noticeFN('success', content, duration, onClose)
  },
  error(content, duration, onClose) {
    return noticeFN('error', content, duration, onClose)
  },
  loading(content = '加载中...', duration = 0, onClose) {
    return noticeFN('loading', content, duration, onClose)
  }
}
