import { getMonthLength } from '../dateExtension'
import { merge } from '../objectExtension'
import { getLongestPeriod, INVALID_RESULT } from './longestPeriod'
import { getPlanLengthRange } from './planLength'
import { RATIO } from './ratio'

// 根据当前的 {账单金额，账单日，还款日，单笔还款限额} 得出可用的 {比例&天数范围}
export const generate = ({ amount, billDate, repayDate, repayLimit }) => {
  const repayCount = amount / repayLimit
  // 一天最多两笔还款，所以计划长度受此限制
  const minPlanLengthByRepayLimit = repayCount / 2
  const today = new Date().getDate()
  const currentMonthLength = getMonthLength({
    year: new Date().getFullYear(),
    monthDisplay: new Date().getMonth() + 1
  })
  const longestPeriod = getLongestPeriod({
    billDate,
    repayDate,
    today,
    currentMonthLength
  })
  if (longestPeriod === INVALID_RESULT) {
    return null
  }
  const getFinalPlanLengthRange = longestPeriod => ratio => {
    const range = getPlanLengthRange({ longestPeriod, ratio })
    if (range === null) {
      return null
    }
    return {
      ratio,
      max: range.max,
      min: Math.max(minPlanLengthByRepayLimit, range.min)
    }
  }
  const notNull = range => range != null
  return Object.keys(RATIO)
    .map(key => RATIO[key].value)
    .map(getFinalPlanLengthRange(longestPeriod))
    .filter(notNull)
    .reduce(
      (acc, { ratio, max, min }) => merge(acc, { [ratio]: { min, max } }),
      {}
    )
}