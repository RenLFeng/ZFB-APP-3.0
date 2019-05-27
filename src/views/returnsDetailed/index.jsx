import React, { Component } from 'react'
import '../../assets/css/common.css'
import '../../assets/css/returnsDetailed.css'
import '../../assets/css/header.css'
import style from './earn.module.css'
import Dialog from '../../components/Dialog/index'
import Empty from '../emptyContent/index'
import dayjs from 'dayjs'
import { accessMonthList, getStartTime, loadData, getProgram } from './calc'
import { tabLevelOne } from './map'
import Card from './card'
import Card2 from './card2'
import { parseURL } from '../../store/URL'
import Loader from '../../components/Loader/index'
import gobackImg from '../../assets/img/login_icon_back_w.png'

export default class ReturnsDetailed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTableLevelOne: 1,
      TableLevelOneClass: '',
      dialogVisiblity: false,
      pickedMonthID: 0,
      TimeList: [],
      selectedTime: dayjs().format('YYYY-MM'),
      allDataList: [],
      currentMonth: '',
      count: 1,
      // 设备收益
      deviceList: [],
      deviceTotal: '',
      deviceloadPage: 1,
      // 活动收益
      programList: [],
      programTotal: '',
      programloadPage: 1,
      isloading: false
    }
  }
  componentDidMount() {
    this.init()
    this.loadData()
  }
  init = () => {
    const typeNumber = this.props.location.search && parseURL(this.props.location.search).type
    if (typeNumber) {
      this.setState({
        currentTableLevelOne: Number(typeNumber)
      })
    }

    getStartTime().then(res => {
      this.setState({
        TimeList: accessMonthList(res)
      })
    })
  }
  loadData = () => {
    const { deviceloadPage, programloadPage, selectedTime } = this.state
    this.setState({
      isloading: true
    })
    this.accessData(deviceloadPage, selectedTime)
    this.accessProgramData(programloadPage, selectedTime)
  }
  accessData = (num, month) => {
    const { deviceList, deviceloadPage } = this.state
    loadData(num, month).then(res => {
      this.setState({
        deviceList: [...deviceList, ...res.rows],
        deviceTotal: res.total,
        deviceloadPage: deviceloadPage + 1,
        isloading: false
      })
    })
  }
  accessProgramData = (num, month) => {
    const { programList, programloadPage } = this.state
    getProgram(num, month).then(res => {
      this.setState({
        programList: [...programList, ...res.rows],
        programTotal: res.total,
        programloadPage: programloadPage + 1,
        isloading: false
      })
    })
  }
  tofinishTist() {
    window.getLoadData.finishTist()
  }
  backPrevious() {
    this.props.history.push('/myAccount')
  }
  openDialog = () => {
    this.setState({
      dialogVisiblity: true
    })
  }
  handlePickMonth = id => {
    const { TimeList } = this.state
    this.setState({
      pickedMonthID: id,
      selectedTime: TimeList[id].numberTime
    })
  }
  closeDialog = () => {
    const { selectedTime } = this.state
    this.setState({
      dialogVisiblity: false,
      deviceloadPage: 1,
      programloadPage: 1,
      currentTableLevelOne: 1,
      programList: [],
      deviceList: [],
      isloading: true
    })
    const initPage = 1
    loadData(initPage, selectedTime).then(res => {
      this.setState({
        deviceList: [...res.rows],
        deviceTotal: res.total,
        deviceloadPage: initPage,
        isloading: false
      })
    })
    getProgram(initPage, selectedTime).then(res => {
      this.setState({
        programList: [...res.rows],
        programTotal: res.total,
        programloadPage: initPage,
        isloading: false
      })
    })
  }
  sectionLevelOne = id => {
    this.setState({
      currentTableLevelOne: id
    })
  }
  loadMoreDevice = () => {
    const { selectedTime } = this.state
    const { deviceloadPage } = this.state
    this.accessData(deviceloadPage, selectedTime)
  }
  loadMoreprogram = () => {
    const { selectedTime } = this.state
    const { programloadPage } = this.state
    this.accessProgramData(programloadPage, selectedTime)
  }
  render() {
    const {
      dialogVisiblity,
      pickedMonthID,
      currentTableLevelOne,
      deviceList,
      selectedTime,
      deviceTotal,
      programTotal,
      programList,
      isloading,
      TimeList
    } = this.state
    const canLoadMoreOfdevice = deviceList.length < Number(deviceTotal)
    const canLoadMoreOfprogram = programList.length < Number(programTotal)
    return (
      <div className={style.returnsDetailed}>
        <div>
          <header>
            <div className={style.head}>
              <div onClick={this.backPrevious.bind(this)} className={style.gobackImgWrap}>
                <img src={gobackImg} alt="" />
              </div>
              <h2>收益明细</h2>
              <div className={style.date}>
                <span className={style.datePicker} onClick={this.openDialog}>
                  {selectedTime}
                </span>
                <div className={style.arrow} />
              </div>
            </div>
          </header>
          <div>
            <div className={style.info}>
              <ul className={style.earnings}>
                {tabLevelOne.map(v => {
                  return (
                    <li
                      key={v.id}
                      onClick={() => {
                        this.sectionLevelOne(v.id)
                      }}
                      className={v.id !== Number(currentTableLevelOne) ? style.earningstab : ''}
                    >
                      <div className={style[v.iconName]} />
                      <p>{v.name}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <section />
          </div>
        </div>
        <div className={style.contentArea} ref="wrapDom">
          {isloading && <Loader />}
          {currentTableLevelOne === 1 && (
            <>
              <ul>
                {deviceList.map(v => (
                  <Card info={v} key={v.tradeNo} />
                ))}
                {canLoadMoreOfdevice && !isloading && (
                  <p onClick={this.loadMoreDevice} className={style.loadMore}>
                    点击加载更多
                  </p>
                )}
              </ul>
              {deviceTotal === 0 && <Empty />}
            </>
          )}
          {currentTableLevelOne === 3 && (
            <>
              <ul>
                {programList.map(v => (
                  <Card2 info={v} key={v.tradeNo} />
                ))}
                {canLoadMoreOfprogram && !isloading && (
                  <p onClick={this.loadMoreprogram} className={style.loadMore}>
                    点击加载更多
                  </p>
                )}
              </ul>
              {programTotal === 0 && <Empty />}
            </>
          )}
          {false && <Empty />}
        </div>
        <Dialog isShow={dialogVisiblity} handleClose={this.closeDialog}>
          <div className={style.pickerMonth}>
            <p className={style.title}>仅显示近半年收益明细</p>
            {TimeList.map((v, id) => {
              return (
                <div
                  className={id === pickedMonthID ? style.active : ''}
                  key={id}
                  onClick={() => {
                    this.handlePickMonth(id)
                  }}
                >
                  <span /> {v.time}
                </div>
              )
            })}
          </div>
        </Dialog>
      </div>
    )
  }
}
