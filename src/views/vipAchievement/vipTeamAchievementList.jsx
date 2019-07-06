import React, { Component } from 'react'
import '../../assets/css/common.css'
import '../../assets/css/header.css'
import '../../assets/css/partnerPerformance.css'
import { post } from '../../store/requestFacade'
import { Link } from 'react-router-dom'
import { toastIt } from '../../components/popup'
import { cutAmount } from '../../store/filter'
import DefaultPage from '../defaultPage';
const   style={
  width:'95%',
  padding:'0 0.10rem'
}
class vipTeamAchievementList extends Component {
  constructor () {
    super()
    this.ulList = React.createRef()
    this.searchContent = this.searchContent.bind(this)
    this.search = this.search.bind(this)
    this.state = {
      userNameList:[],
      organName:'',
      repaymentListData:[]
    }
  }
  async getRepaymentList () {
    try{
      const res = await post ({
        url:'monthresults/monthList',
        data:{
          statisticalSource:2,
          statisticsType:this.props.location.state.tradeType,
          organName:this.state.organName
        }
      })
      this.setState({
        repaymentListData:res.data
      })
    }catch (err) {
      console.log(err)
    }
  }
  search () {
    if(this.state.userNameList.includes(this.state.organName)) {
      let toScrollHeight = this.state.userNameList.indexOf(this.state.organName)*60
      this.ulList.current.scrollTop = toScrollHeight
    } 
    else if (this.state.organName === '') {
      this.ulList.current.scrollTop = 0
    }
    else {
      this.ulList.current.scrollTop = 0
      toastIt('无该VIP')
    }
  }
  showHighlight (index) {
    if(index === this.state.userNameList.indexOf(this.state.organName)) {
      return 'merchantUser active'
    }
    else {
      return 'merchantUser'
    }
  }
  getPrefix (index) {
    if (index === 1) {
      return (<img className='topThree' src={require('../../assets/img/firstPlace.png')} alt=""/>)
    }
    if (index === 2) {
      return (<img className='topThree' src={require('../../assets/img/secondPlace.png')} alt=""/>)
    }
    if (index === 3) {
      return (<img className='topThree' src={require('../../assets/img/thirdPlace.png')} alt=""/>)
    }
    return (<span className='afterThree'>{index}</span>)
  }
  getAfterfix (isBillion, isMust) {
    if(isBillion === 1 ) {
      return (<img style={{width:'.6rem',height:'.18rem',verticalAlign:'middle',margin:'0 0 0 .04rem'}} src={require('../../assets/img/achievementBillon.png')} alt=""/>)
    }
    if (isMust === 1) {
      return (<img style={{width:'.6rem',height:'.18rem',verticalAlign:'middle',margin:'0 0 0 .04rem'}} src={require('../../assets/img/achievementTwentyMillon.png')} alt=""/>)
    }
  }
  searchContent (event) {
    this.setState({
      organName:event.target.value
    })
  }
  backPrevious () {
    this.props.history.goBack()
  }
  getTitle () {
    if( this.props.location.state.tradeType === 3) {
      return '本月VIP快捷收款交易量 (元)'
      
    }
    if( this.props.location.state.tradeType === 4) {
      return  '本月VIP快捷还款交易量 (元)'
    }
  }
  async componentDidMount () {
    await this.getRepaymentList()
    for (let i = 0 ; i < this.state.repaymentListData.length; i++) {
      this.state.userNameList.push(this.state.repaymentListData[i].userName) 
    }
    this.setState({
      userNameList:this.state.userNameList
    })
  }
  render() {
    return (
      <div>
        <div className="headWrap">
          <header>
            <div className="head">
              <div className="toback" onClick={this.backPrevious.bind(this)} />
              <h2>团队业绩</h2>
            </div>
          </header>
          <div className="searchBox">
            <img className='searchIcon' src={require('../../assets/img/search.png')} alt=""/>
            <input placeholder='请输入查找的VIP姓名' className='searchInput' value={this.state.organName} onChange={this.searchContent} type="search"/>
            <div className="searchBtn" onClick={this.search}>搜索</div>
          </div>
        </div>
        {
          this.state.repaymentListData.length === 0 ?
            (<DefaultPage text={'暂无团队业绩'} />) :
            (
              <div>
                <p className='merchantSubtitle'>{this.getTitle()}</p>
                <ul className="repaymentlist" ref={this.ulList} style={style}>
                  {
                    this.state.repaymentListData.map((ele, index) => {
                      return (
                        <Link key={index} to={{
                          pathname:'/vipDetail',
                          state:{organType:2,
                            organId: ele.organId}
                        }}>
                          <li key={index}>
                            <div className={this.showHighlight(index)}>
                              {this.getPrefix(index + 1)}{ele.userName}{this.getAfterfix(ele.isBillion, ele.isMust)}
                            </div>
                            <div className="merchatnTransaction">{cutAmount(ele.statisticalAmount)}</div>   
                          </li>
                        </Link>
                      )
                    })
                  }
                </ul>
              </div>
            )
        }
      </div>
    )
  }
}
export default vipTeamAchievementList