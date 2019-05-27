import dayjs from 'dayjs'
import { post } from '../../store/requestFacade'

export const accessMonthList = rawStr => {
  const now = dayjs()
  let str = rawStr.slice(0, 7)
  const diffMonth = now.diff(dayjs(str), 'month')
  console.log('diffMonth: ', diffMonth)
  let monthArray = []
  if (diffMonth >= 6) {
    for (let index = 0; index <= 5; index++) {
      monthArray.push(now.subtract(index, 'month').format('YYYY-MM'))
    }
  } else {
    for (let index = 0; index <= diffMonth; index++) {
      monthArray.push(now.subtract(index, 'month').format('YYYY-MM'))
    }
  }
  return monthArray
    .map((v, i) => ({
      numberTime: v,
      time: v.replace(/-/, '年'),
      key: i
    }))
    .map(v => ({
      ...v,
      time: v.time + '月'
    }))
}

export async function getStartTime() {
  try {
    const res = await post({
      url: 'profit/partnerDate',
      data: {}
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function loadData(num, month) {
  try {
    const res = await post({
      url: 'profit/deviceEarnings',
      data: {
        date: month,
        pageSize: '20',
        pageNumber: num
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function getProgram(num, month) {
  try {
    const res = await post({
      url: 'profit/reward',
      data: {
        date: month,
        pageSize: '20',
        pageNumber: num
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
