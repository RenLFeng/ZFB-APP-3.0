import dayjs from 'dayjs'

export const formatDate = number => dayjs(Number(number)).format('YYYY-MM-DD HH:mm:ss')
export const pipe = fns => fns.reduce((f, g) => (...args) => g(f(...args)))
export const objectFromPairs = arr =>
  arr.reduce(
    (init, v) => ({
      ...init,
      [v[0]]: v[1]
    }),
    {}
  )

export const accessHalfYearMonthList = () => {
  let monthArray = []
  const now = dayjs()
  for (let index = 0; index <= 5; index++) {
    monthArray.push(now.subtract(index, 'month').format('YYYY-MM'))
  }
  return monthArray.map((v, i) => ({
    month: v,
    time: v.replace(/-/, '年') + '月',
    key: i
  }))
}

export const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()
