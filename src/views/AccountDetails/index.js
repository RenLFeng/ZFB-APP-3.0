import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/index'
import Cards from './sub/card'
import style from './sub/index.module.scss'
import dayjs from 'dayjs'
import Dialog from '../../components/Dialog/index'
import { accessHalfYearMonthList } from '../../public/utils'
import { post } from '../../store/requestFacade'
import Loader from '../../components/Loader/index'
import Empty from '../../components/Empty/index'

export default function AccountDetails(props) {
  const [monthValue, setMonthValue] = useState(dayjs().format('YYYY-MM'))
  const [pickedMonthID, setPickedMonthID] = useState(0)
  const [dialogVisiblity, setDialogVisiblity] = useState(false)
  const [accumulator, setAccumulator] = useState(1)
  const [isEmpty, setIsEmpty] = useState(true)
  const [dataList, setDataList] = useState([])
  const [monthReward, setMonthReward] = useState(0)
  const [loaderStatus, setLoaderStatus] = useState(true)
  const [currentPage, setcurrentPage] = useState(1)
  const [canFetchMore, setcanFetchMore] = useState(true)
  const [MonthChangeStatus, setMonthChangeStatus] = useState(false)


console.log(props.location.query);

  const availdDateList = accessHalfYearMonthList()
  const type = props.location.query.type
  const pageTitle = props.location.query.title
  const api = props.location.query.api
  const statisticsType = props.location.query.statisticsType

  const Card = Cards[type]
  const canShowMonthReward = ['EquipmentRepayment', 'EquipmentCollection'].includes(type)
  const handlePickMonth = v => {
    setMonthChangeStatus(pickedMonthID === v.key)
    setPickedMonthID(v.key)
    setMonthValue(v.month)
  }
  const handleGoBack = () => {
    const goback = props.location.query.goback
    goback()
  }
  const handleSetDialogVisiblity = param => {
    setDialogVisiblity(param)
    if (!param) {
      if (!MonthChangeStatus) {
        setAccumulator(accumulator + 1)
        setcurrentPage(1)
        setcanFetchMore(true)
        setDataList([])
      }
    }
  }

  async function handleFetchMore() {
    setcurrentPage(currentPage + 1)
    setAccumulator(accumulator + 1)
  }
  async function getData() {
    try {
      const res = await post({
        url: api,
        data: {
          date: monthValue,
          statisticsType,
          pageNumber: currentPage
        }
      })
      if (res.retMsg === '成功') {
        res.monthReward && setMonthReward(res.data.monthReward.totalReward)
        const data = [...dataList, ...res.data.rows]
        const EmptyStatus = data.length > 0
        console.log('EmptyStatus: ', EmptyStatus)
        setDataList(data)
        setIsEmpty(!EmptyStatus)
        setLoaderStatus(false)
        setcanFetchMore(!(res.data.total === data.length))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoaderStatus(true)
    getData()
    console.log(`%c useEffect is running ${currentPage}`, 'background:#eee;color:rgb(0, 179, 211)')
  }, [accumulator])

  return (
    <div className={style.wrap}>
      <Header
        title={pageTitle}
        handleGoBack={handleGoBack}
        whiteArrow
        color="#fff"
        backgroundColor="#4289ff"
      >
        <div onClick={() => handleSetDialogVisiblity(true)}>{monthValue}</div>
      </Header>
      <div className={style.content}>
        <div className={style.allItems} id="ItemRoot">
          {isEmpty ? (
            <Empty
              text={`暂无${availdDateList[pickedMonthID].time}数据`}
              styleObj={{ position: 'fixed', top: '6vh', left: '0' }}
            />
          ) : (
            <>
              {canShowMonthReward ? (
                <>
                  {monthReward ? (
                    <h3>
                      {availdDateList[pickedMonthID].time}的总分润{monthReward}
                    </h3>
                  ) : (
                    <h3>尚未生成{availdDateList[pickedMonthID].time}的完整账单</h3>
                  )}
                </>
              ) : (
                <h3 className={style.fakeH3}>123123</h3>
              )}

              <div className={style.allItems} id="ItemRoot">
                {dataList.map(v => (
                  <Card data={v} key={v.tradeNo} />
                ))}
                {canFetchMore && (
                  <div className={style.fetchMore} onClick={handleFetchMore}>
                    加载更多
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Dialog isShow={dialogVisiblity} handleClose={() => handleSetDialogVisiblity(false)}>
        <div className={style.pickerMonth}>
          <p className={style.title}>仅显示近半年收益明细</p>
          {availdDateList.map(v => {
            return (
              <div
                className={v.key === pickedMonthID ? style.active : ''}
                key={v.key}
                onClick={() => handlePickMonth(v)}
              >
                <span /> {v.time}
              </div>
            )
          })}
        </div>
      </Dialog>
      {loaderStatus && <Loader />}
    </div>
  )
}
