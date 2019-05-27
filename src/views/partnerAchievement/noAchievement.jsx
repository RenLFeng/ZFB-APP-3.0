import React, { Component } from 'react'
import '../../assets/css/header.css'
import '../../assets/css/common.css'
import bg from '../../assets/img/no-achievement.png'
class noAchievement extends Component {
  backPrevious () {
    this.props.history.goBack()
  }
  render () {
    const noAchievementBg = {
      background:'url(' + bg + ') no-repeat center 1.44rem',
      backgroundSize:'2.45rem 1.8rem',
      width:'100%',
      height:'6.02rem'
    }
    return (
      <div>
        <header>
          <div className="head" style={{backgroundColor:'#fff'}}>
            <div className="toback-b" onClick={() =>{this.backPrevious()} } />
            <h2 style={{color:'#000',borderBottom:'1px solid #e5e5e5'}}>历史业绩</h2>
          </div>
        </header>
        <div style={noAchievementBg}>
          <p style={{position:'relative',textAlign:'center',top:'3.14rem',fontSize:'.13rem',color:'#666'}}>暂无历史业绩</p>
        </div>
      </div>
    )
  }
}
export default noAchievement