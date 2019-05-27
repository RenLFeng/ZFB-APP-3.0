/* eslint-disable */
import React from 'react'

export default class Index extends React.Component {
  state = {
    List: [],
    id: 0,
    Time: 300
  }

  getNoticeKey = () => {
    const { id } = this.state
    const newID = id + 1
    this.setState({
      id: newID
    })
    return newID
  }

  addNotice = noticeObj => {
    noticeObj.key = this.getNoticeKey()
    const newList = [noticeObj] // 仅展示最后一个提示
    this.setState({ List: newList })
    if (noticeObj.duration > 0) {
      setTimeout(() => {
        this.removeNotice(noticeObj.key)
      }, noticeObj.duration)
    }
    return () => {
      this.removeNotice(noticeObj.key)
    }
  }
  removeNotice = key => {
    const { List, Time } = this.state
    this.setState({
      List: List.filter(v => {
        if (v.key === key) {
          if (v.onClose) setTimeout(v.onClose, Time)
          return false
        }
        return true
      })
    })
  }
  render() {
    const { List } = this.state
    const icons = {
      info: 'toast_info',
      success: 'toast_success',
      error: 'toast_error',
      loading: 'toast_loading'
    }
    return (
      <>
        <div className="toast">
          {List.map(notice => (
            <div key={notice.key} className="toast_box">
              {/* <div className={`toast_icon ${icons[notice.type]}`} /> */}
              {notice.content}
            </div>
          ))}
        </div>
      </>
    )
  }
}
