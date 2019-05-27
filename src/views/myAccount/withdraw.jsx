import React, { Component } from "react";
import "../../assets/css/myAccount.css"
import { post } from '../../store/requestFacade'

export default class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withdrawData: []
    }
  }
  LinkTo(withdrawId) {
    this.props.history.push({
      pathname:`withdrawDetail`,
      withdrawId: withdrawId
    });
  }
  getWithdrawData = async() =>{
    try {
      const res = await post({
        url: 'wallet/withdraw/query',
      })
      this.setState({
        withdrawData: res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  showWithdrawMsg (withdrawMsg,bankCard,status) {
    const statusMap = {
      0: (<dd style={recordDt}>处理中</dd>),
      1: (<dd style={error}>{withdrawMsg}</dd>),
      2: (<dd style={recordDt}>处理中</dd>),
      3: (<dd style={recordDt}>{bankCard}</dd>),
      4: (<dd style={error}>{withdrawMsg}</dd>)
    }
    return statusMap[status]
  }
  componentWillMount () {
    this.getWithdrawData()
  }
  render() {
    return (
      <ul>
        {
          this.state.withdrawData.map((ele, index) =>{
            return (
              <li key={index}> 
                <p style={withdrawMonth}>{ele.time}</p>
                {
                  ele.records.map( (subEle, subIndex) => {
                    return (
                      <div style={oneRecord} className={subIndex < ele.records.length -1 ?'borderBottom':null} key={subIndex} onClick={this.LinkTo.bind(this,subEle.withdrawId)}>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <img style={{width:'.22rem',height:'.22rem',margin:'0 .1rem 0 0'}} src={require('../../assets/img/ti.png')} alt=""/>
                          <dl>
                            <dt>提现</dt>
                            <dd style={recordDt}>{subEle.withdrawDate}</dd>
                          </dl>
                        </div>
                        <div>
                          <dl>
                            <dt style={{fontSize:'.2rem',textAlign:'right'}}> - {subEle.withdrawAmt}</dt>
                            {this.showWithdrawMsg(subEle.withdrawMsg,subEle.bankCard,subEle.status)}
                            {/* <dd style={recordDt}>{subEle.bankCard}</dd> */}
                          </dl>
                        </div>
                      </div>
                    )
                  })
                }
              </li>
            )
          })
        }
      </ul>
    )
  }
}
const withdrawMonth = {
  width:'100%',
  height:'.3rem',
  lineHeight:'.3rem',
  backgroundColor:'#f1f1f1',
  color:'#666',
  padding:'0 0 0 .15rem',
  fontSize:'.13rem'
}
const oneRecord = {
  display:'flex',
  width:'3.45rem',
  height:'.78rem',
  margin:'0 auto',
  alignItems:'center',
  justifyContent:'space-between'
}
const recordDt = {
  color:'#999',
  fontSize:'.12rem',
  padding:'.04rem 0 0',
  textAlign:'right'
}
const error = {
  color: 'red',
  fontSize:'.12rem',
  padding:'.04rem 0 0',
  textAlign:'right'
}