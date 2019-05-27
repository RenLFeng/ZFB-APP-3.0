import React, { Component } from 'react'
import style from './index.module.scss'
import dayjs from 'dayjs'
import { getStorageList, formateStorageList, getGiveoutList, getActivateList } from './own/calc'
import Loader from '../../components/Loader/index.js'
import { StorageCard } from './sub/card'
import Empty from '../Empty/index'
import { navList } from './own/map'
import ShowDeviceID from './sub/deviceID.js'
import Header from '../../components/Header/index'
import { post } from '../../store/requestFacade'
import Dialog from '../../components/Dialog/confirm'
// import Toast from '../../components/_toast/index'

const init = {
  storageList: [],
  storageTotal: 0,
  storagePage: 1,
  storageTotalPos: 0,
  storageMonthPos: 0,
  deviceListInfo: {},
  // 下发
  giveoutList: [],
  giveoutTotal: 0,
  giveoutPage: 1,
  giveoutTotalPos: 0,
  giveoutMonthPos: 0,
  // 激活
  activatedList: [],
  activatedTotal: 0,
  activatedPage: 1,
  activatedTotalPos: 0,
  activatedMonthPos: 0
}

export default class index extends Component {
  state = {
    currentNavIndex: '',
    selectedTime: dayjs().format('YYYY-MM'),
    timeList: [],
    loaderVisiblity: true,
    dialogVisiblity: false,
    dialogOfDeviceId: false,
    pickedMonthID: 0,
    ...init,
    DepositDialog: false,
    DepositDevice: {}
  }
  componentDidMount() {
    const time = dayjs().format('YYYY-MM')
    if (this.props.location.query && this.props.location.query.type) {
      this.setState({
        currentNavIndex: this.props.location.query.type
      })
    }
    this.accessData(time)
  }
  accseeGiveoutList = type => {
    const time = dayjs().format('YYYY-MM')
    const { giveoutPage } = this.state
    const initPageNumber = type === 'refesh' ? 1 : giveoutPage
    getGiveoutList(initPageNumber, time)
      .then(res => {
        this.setState({
          loaderVisiblity: false,
          giveoutList: res.rows,
          giveoutTotalPos: res.totalPos,
          giveoutMonthPos: res.monthPos,
          giveoutTotal: res.total,
          giveoutPage: giveoutPage + 1
        })
      })
      .catch(res => console.log(res))
  }
  accessData = time => {
    const { storagePage, giveoutPage, activatedPage } = this.state
    getStorageList(storagePage, time)
      .then(res => {
        this.setState({
          storageTotalPos: res.totalPos,
          storageMonthPos: res.monthPos,
          storageList: formateStorageList(res.rows),
          storagePage: storagePage + 1,
          loaderVisiblity: false,
          storageTotal: res.total
        })
      })
      .catch(e => console.log(e))
    this.accseeGiveoutList()
    getActivateList(activatedPage, time)
      .then(res => {
        this.setState({
          loaderVisiblity: false,
          activatedList: res.rows,
          activatedTotalPos: res.totalPos,
          activatedMonthPos: res.monthPos,
          activatedTotal: res.total,
          activatedPage: activatedPage + 1
        })
      })
      .catch(res => console.log(res))
  }
  handleNavTab = num => {
    this.setState({
      currentNavIndex: num
    })
  }
  handleAddMoreStore = () => {
    const { storagePage, storageList, selectedTime } = this.state
    getStorageList(storagePage, selectedTime)
      .then(res => {
        this.setState({
          storageTotalPos: res.totalPos,
          storageMonthPos: res.monthPos,
          storageList: [...storageList, ...formateStorageList(res.rows)],
          storagePage: storagePage + 1,
          loaderVisiblity: false,
          storageTotal: res.total
        })
      })
      .catch(e => console.log(e))
  }
  handleAddMoreGiveout = () => {
    const { giveoutPage, giveoutList, selectedTime } = this.state
    getGiveoutList(giveoutPage, selectedTime)
      .then(res => {
        this.setState({
          loaderVisiblity: false,
          giveoutList: [...giveoutList, ...res.rows],
          giveoutTotalPos: res.totalPos,
          giveoutMonthPos: res.monthPos,
          giveoutTotal: res.total,
          giveoutPage: giveoutPage + 1
        })
      })
      .catch(res => console.log(res))
  }
  handleAddMoreActivate = () => {
    const { selectedTime, activatedPage, activatedList } = this.state
    getActivateList(activatedPage, selectedTime)
      .then(res => {
        this.setState({
          loaderVisiblity: false,
          activatedList: [...activatedList, ...res.rows],
          activatedTotalPos: res.totalPos,
          activatedMonthPos: res.monthPos,
          activatedTotal: res.total,
          activatedPage: activatedPage + 1
        })
      })
      .catch(res => console.log(res))
  }
  handleShowMore = index => {
    const { storageList } = this.state
    this.setState({
      dialogOfDeviceId: true,
      deviceListInfo: {
        ...storageList[index]
      }
    })
  }
  handleCloseDeviceIdDialog = () => {
    this.setState({
      dialogOfDeviceId: false
    })
  }

  handleGoBack = () => {
    // window.getLoadData.finishTist()
    // 流动记录 左上角导航  ==》 设备管理页面
    window.getLoadData.jump('DeviceManagePage')
  }
  handleCancelDeposit = item => {
    this.setState({
      DepositDialog: true,
      DepositDevice: item
    })
  }
  handleDialogComfirmNO = () => {
    this.setState({
      DepositDialog: false
    })
  }

  handleDialogomfirmYES = async item => {
    const { DepositDevice } = this.state
    console.log('DepositDevice: ', DepositDevice)
    const api = 'deposit/cancelDeposit'
    const body = {
      devNo: DepositDevice.devNo,
      toOrganId: DepositDevice.organId
    }
    try {
      const res = await post({
        url: api,
        data: {
          ...body
        }
      })
      if (res.retCode === '0000') {
        this.setState({
          DepositDialog: false
        })
        this.accseeGiveoutList('refesh')
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleDepositDetails = item => {
    console.log('查看押金详情', item)
    if (Number(item.isDeposit) !== 1) {
      return
    }
    this.props.history.push({
      pathname: 'deposit',
      query: {
        devNo: item.devNo,
        organId: item.organId
      }
    })
  }

  render() {
    const {
      currentNavIndex,
      loaderVisiblity,
      storageTotalPos,
      storageMonthPos,
      storageList,
      storageTotal,
      giveoutList,
      giveoutTotal,
      activatedList,
      activatedTotal,
      DepositDialog
    } = this.state

    const { TabIndex } = this.props
    const activedTableIndex = currentNavIndex === '' ? TabIndex : currentNavIndex
    const trans = {
      transform: `translate(${activedTableIndex * -100}vw, 0%)`,
      transition: `all 0.15s ease-in-out`
    }
    const isShowStorageBtn = !(storageList.length >= storageTotal)
    const isShowGiveoutBtn = !(giveoutList.length >= giveoutTotal)
    const isShowActivatBtn = !(activatedList.length >= activatedTotal)
    // console.log('isShowStorageBtn: ', isShowStorageBtn)
    // console.log('isShowGiveoutBtn: ', isShowGiveoutBtn)
    // console.log('isShowActivatBtn: ', isShowActivatBtn)
    // activiteStatus

    return (
      <div className={style.wrap}>
        <Header
          title="流动记录"
          handleGoBack={this.handleGoBack}
          blackArrow
          color="#000"
          backgroundColor="#fff"
        />
        <nav style={{ marginTop: '6vh' }}>
          {navList.map(v => {
            return (
              <div
                className={activedTableIndex === v.id ? style.active : ''}
                key={v.id}
                onClick={() => {
                  this.handleNavTab(v.id)
                }}
              >
                {v.name}
              </div>
            )
          })}
        </nav>
        <div className={style.content}>
          {!loaderVisiblity && (
            <div className={style.contentWrap} style={trans}>
              {this.state.storageTotal ? (
                <section className={style.sectionNoBG}>
                  <div className={style.total}>
                    总入库数量:{storageTotalPos}台;当月入库数量:
                    {storageMonthPos}台
                  </div>
                  <div className={style.flex}>
                    <ul>
                      {this.state.storageList.map((v, i) => (
                        <StorageCard
                          text={'入库时间'}
                          data={v}
                          key={v.orderNo}
                          showMore={() => {
                            this.handleShowMore(i)
                          }}
                        />
                      ))}
                    </ul>
                    {isShowStorageBtn && (
                      <div className={style.addMore} onClick={this.handleAddMoreStore}>
                        点击加载更多
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                <section className={style.sectionNoBG}>
                  <Empty text={'暂无数据'} />
                </section>
              )}
              {this.state.giveoutTotal ? (
                <section className={style.sectionNoBG}>
                  <div className={style.total}>
                    总下发数量:{this.state.giveoutTotalPos}
                    台;当月下发数量:
                    {this.state.giveoutMonthPos}台
                  </div>
                  <div className={style.flex}>
                    <ul>
                      {this.state.giveoutList.map(v => (
                        <StorageCard
                          data={v}
                          key={v.orderNo}
                          text={'下发时间'}
                          handleCancelDeposit={() => {
                            this.handleCancelDeposit(v)
                          }}
                        />
                      ))}
                    </ul>
                    {isShowGiveoutBtn && (
                      <div className={style.addMore} onClick={this.handleAddMoreGiveout}>
                        点击加载更多
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                <section className={style.sectionNoBG}>
                  <Empty text={'暂无数据'} />
                </section>
              )}
              {this.state.activatedTotal ? (
                <section className={style.sectionNoBG}>
                  <div className={style.total}>
                    总激活数量:{this.state.activatedTotalPos}
                    台;当月激活数量:
                    {this.state.activatedMonthPos}台
                  </div>
                  <div className={style.flex}>
                    <ul>
                      {this.state.activatedList.map(v => (
                        <StorageCard
                          data={v}
                          key={v.devNo}
                          text={'激活时间'}
                          handleDepositDetails={() => this.handleDepositDetails(v)}
                        />
                      ))}
                    </ul>
                    {isShowActivatBtn && (
                      <div className={style.addMore} onClick={this.handleAddMoreActivate}>
                        点击加载更多
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                <section className={style.sectionNoBG}>
                  <Empty text={'暂无数据'} />
                </section>
              )}
            </div>
          )}
        </div>
        {loaderVisiblity && <Loader />}
        <ShowDeviceID
          data={this.state.deviceListInfo}
          isShow={this.state.dialogOfDeviceId}
          handleClose={this.handleCloseDeviceIdDialog}
        />
        <Dialog
          isShow={DepositDialog}
          handleYes={this.handleDialogomfirmYES}
          handleNo={this.handleDialogComfirmNO}
          okText="确定"
          noText="取消"
        >
          <p style={{ textAlign: 'center' }}>确定取消押金设备?</p>
        </Dialog>
      </div>
    )
  }
}

index.defaultProps = {
  TabIndex: 0
}
