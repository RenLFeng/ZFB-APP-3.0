import React, { Component } from 'react'
import { createCover } from '../../components/cover'

export class WorkingAmountDesc extends Component {
  render() {
    const style = {
      container: {
        width: '3.15rem',
        borderRadius: '0.04rem',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      },
      header: {
        container: {
          height: '1rem',
          width: '3.15rem',
          position: 'relative'
        },
        img: {
          height: '1rem',
          width: '3.15rem'
        },
        title: {
          height: '0.23rem',
          fontSize: '0.24rem',
          color: 'rgba(255,255,255,1)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        },
        close: {
          width: '0.2rem',
          height: '0.2rem',
          position: 'absolute',
          right: '0.1rem',
          top: '0.1rem'
        }
      },
      desc: {
        container: {
          width: '3.15rem',
          height: '2.1rem',
          background: 'rgba(255,255,255,1)',
          borderRadius: '0rem 0rem 0.04rem 0.04rem',
          position: 'relative'
        },
        content: {
          position: 'absolute',
          top: '0.3rem',
          left: '0.18rem',
          right: '0.18rem',
          fontSize: '0.14rem',
          color: '#333333'
        },
        warning: {
          position: 'absolute',
          bottom: '0.72rem',
          left: '0.18rem',
          right: '0.18rem',
          fontSize: '0.12rem',
          color: '#FC4E4E'
        }
      }
    }
    return createCover(() => {
      return (
        <div style={style.container}>
          <div style={style.header.container}>
            <img
              alt=""
              style={style.header.img}
              src={require('./assets/working_amount_desc.png')}
            />
            <div style={style.header.title}>周转金</div>
            <img
              alt=""
              onClick={this.props.close}
              src={require('./assets/close.png')}
              style={style.header.close}
            />
          </div>
          <div style={style.desc.container}>
            <div style={style.desc.content}>
              周转金是您信用卡内事先预留的可用额度，包含了平台需要扣取的手续费，用于还款计划先消费后还款的周转操作。
            </div>
            <div style={style.desc.warning}>
              请确保信用卡有足够的可用额度，避免还款计划失败。
            </div>
          </div>
        </div>
      )
    })
  }
}
