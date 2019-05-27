export const INVALID_RESULT = -1

const filterByMinValue = input => {
  if (input < 3) {
    return INVALID_RESULT
  }
  return input
}

/**
 * 获取最大还款周期
 * @param billDate 账单日
 * @param repayDate 还款日
 * @param today 今天几号
 * @param currentMonthLength 当前月份的长度
 */
export const getLongestPeriod = ({
  billDate, //5
  repayDate, //23
  today, //20
  currentMonthLength //31
}) => {
  if (billDate === repayDate) {
    return INVALID_RESULT
  }
  // 账单日 还款日在同一个月，今天应该在 [账单日， 还款日]
  if (billDate < repayDate) {
    if (today < billDate) {
      return INVALID_RESULT
    }
    if (today > repayDate) {
      return INVALID_RESULT
    }
    return filterByMinValue(repayDate - today)
  }
  // 账单日 还款日不在同一个月，今天应该在 [账单日，月底] || [月初，还款日]
  if (today < billDate && today > repayDate) {
    return INVALID_RESULT
  }
  if (today >= billDate && today <= currentMonthLength) {
    return filterByMinValue(repayDate + currentMonthLength - today)
  }
  return filterByMinValue(repayDate - today)
}
