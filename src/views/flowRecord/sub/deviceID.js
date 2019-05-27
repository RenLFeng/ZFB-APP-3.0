import React, { Component } from 'react'
import Dialog from '../../../components/Dialog/index'
import style from './card.module.scss'
export default class ShowDeviceID extends Component {
  render() {
    const {
      data: { devList, price },
      isShow,
      handleClose
    } = this.props
    return (
      <Dialog isShow={isShow} handleClose={handleClose}>
        <ul className={style.deviceID}>
          {devList &&
            devList.map(v => {
              return (
                <li key={v}>
                  <p>{v}</p>
                  <p>¥{price}</p>
                </li>
              )
            })}
        </ul>
      </Dialog>
    )
  }
}
