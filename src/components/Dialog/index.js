import React, { Component } from 'react'
import Modal from 'react-modal'
import style from './index.module.css'
import PropTypes from 'prop-types'

export default class Loader extends Component {
  render() {
    const { isShow, handleClose } = this.props
    return (
      <>
        <Modal isOpen={isShow} className={style.Modal} overlayClassName={style.Overlay}>
          <div className={style.dialogContent}> {this.props.children}</div>
          <div className={style.dialogBtn} onClick={() => handleClose()}>
            确定
          </div>
        </Modal>
      </>
    )
  }
}

Loader.propTypes = {
  isShow: PropTypes.bool,
  // text: PropTypes.string,
  handleClose: PropTypes.func
}
