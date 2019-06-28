import React, { Component } from 'react'
import Modal from 'react-modal'
import style from './index.module.css'
import PropTypes from 'prop-types'

export default class Loader extends Component {
  render() {
    // const html='<div className="content">content</div>'
    const { isShow, handleClose,text,showHtml} = this.props
    return (
      <>
        <Modal isOpen={isShow} className={style.Modal} overlayClassName={style.Overlay}>
          <div className={style.dialogContent}> {this.props.children}</div>
            {/* <div  dangerouslySetInnerHTML={{ __html: showHtml}}></div> */}
          <div className={style.dialogBtn} onClick={() => handleClose()}>
            {text}
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


