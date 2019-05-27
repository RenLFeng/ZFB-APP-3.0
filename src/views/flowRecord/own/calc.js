import { post } from '../../../store/requestFacade'

export const formateStorageList = arr => {
  const arr2 = arr.map(v => ({
    ...v
  }))
  console.log(arr2)
  return arr2
}

export async function getStorageList(num, month) {
  try {
    const res = await post({
      url: 'record/putRecord',
      data: {
        date: month,
        pageSize: '10',
        pageNumber: num
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function getGiveoutList(num, month) {
  try {
    const res = await post({
      url: 'record/outRecord',
      data: {
        date: month,
        pageSize: '10',
        pageNumber: num
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export async function getActivateList(num, month) {
  try {
    const res = await post({
      url: 'record/activateRecord',
      data: {
        date: month,
        pageSize: '10',
        pageNumber: num
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
  }
}
