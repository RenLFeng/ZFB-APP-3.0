import React, { Component } from 'react'
import Modal from 'react-modal'
import './loader.css'

export default class Loader extends Component {
  render() {
    return (
      <>
        <Modal isOpen={true} className="Modal" overlayClassName="Overlay">
          <div className="loader-box">
            <div className="spain-loader-container">
              <div className="line-spin-fade-loader">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
            <p>加载中···</p>
          </div>
        </Modal>
      </>
    )
  }
}
