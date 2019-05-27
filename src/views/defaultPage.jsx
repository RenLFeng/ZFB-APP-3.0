import React, { Component } from 'react'
import bg from '../assets/img/no-achievement.png'

export default class DefaultPage extends  Component {
  render() {
    return (
      <div style={noAchievementBg}>
        <p style={{position:'relative',textAlign:'center',top:'3.14rem',fontSize:'.13rem',color:'#666'}}>{this.props.text}</p>
      </div>
    )
  }
}
const noAchievementBg = {
  background:'url(' + bg + ') no-repeat center 1.44rem',
  backgroundSize:'2.45rem 1.8rem',
  width:'100%',
  height:'5rem'
}
