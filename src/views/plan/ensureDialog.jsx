import React, { Component } from 'react'
import { createCover } from '../../components/cover'

export class EnsureDialog extends Component {

  render() {
    return createCover(() => {
      return <div style={style.container}>
        <div style={style.content.container}>
          <div style={style.content.text}>
            {this.props.content}
          </div>
        </div>
        <div>
          <div style={style.opt.negative} onClick={this.props.onClickNegative}>
            {this.props.negativeText}
          </div>
          <div style={style.opt.positive} onClick={this.props.onClickPositive}>
            {this.props.positiveText}
          </div>
        </div>
      </div>
    })
  }
}

const style = {
  container: {
    width: '3.15rem',
    height: '1.5rem',
    background: 'rgba(255,255,255,1)',
    borderRadius: '0.04rem',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  content: {
    container: {
      paddingTop: '0.45rem',
      height: '1.05rem',
      width: '100%',
      borderBottom: '1px solid #DFDFDF'
    },
    text: {
      color: '#3A3A3A',
      fontSize: '0.14rem',
      width: '2.57rem',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  opt: {
    negative: {
      width: '50%',
      float: 'left',
      textAlign: 'center',
      fontSize: '0.15rem',
      height: '0.45rem',
      lineHeight: '0.45rem',
      borderRight: '1px solid #DFDFDF',
      color: '#666666'
    },
    positive: {
      width: '50%',
      float: 'left',
      textAlign: 'center',
      fontSize: '0.15rem',
      height: '0.45rem',
      lineHeight: '0.45rem',
      color: '#4288FF'
    }
  }
}