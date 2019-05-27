import React, { Component } from 'react'
import Modal from 'react-modal'
import style from './index.module.css'
import PropTypes from 'prop-types'

export default class ComfirmDialog extends Component {
  render() {
    const { isShow, handleYes, handleNo, okText, noText } = this.props
    return (
      <>
        <Modal isOpen={isShow} className={style.Modal} overlayClassName={style.Overlay}>
          <div className={style.dialogContent}> {this.props.children}</div>
          <div className={style.btns}>
            <div className={style.dialogBtn} onClick={() => handleNo()}>
              {noText}
            </div>
            <div className={style.dialogBtn} onClick={() => handleYes()}>
              {okText}
            </div>
          </div>
        </Modal>
      </>
    )
  }
}
ComfirmDialog.defaultProps = {
  noText: '下次再说'
}
ComfirmDialog.propTypes = {
  isShow: PropTypes.bool
}
