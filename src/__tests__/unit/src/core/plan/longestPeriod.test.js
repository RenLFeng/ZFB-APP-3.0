import { getLongestPeriod, INVALID_RESULT } from '../../../../../core/plan/longestPeriod'

const testCases = [
  {
    input: {
      billDate: 5, // 账单日
      repayDate: 20, // 还款日
      today: 10, // 今天几号
      currentMonthLength: 30 // 这个月多少天
    },
    output: 10 // 最长还款周期
  },
  {
    input: {
      billDate: 5, // 账单日
      repayDate: 20, // 还款日
      today: 4, // 今天几号
      currentMonthLength: 30 // 这个月多少天
    },
    output: INVALID_RESULT // 最长还款周期
  },
  {
    input: {
      billDate: 5, // 账单日
      repayDate: 20, // 还款日
      today: 21, // 今天几号
      currentMonthLength: 30 // 这个月多少天
    },
    output: INVALID_RESULT // 最长还款周期
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 21,
      currentMonthLength: 30
    },
    output: 14
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 21,
      currentMonthLength: 31
    },
    output: 15
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 19,
      currentMonthLength: 31
    },
    output: INVALID_RESULT
  },
  {
    input: {
      billDate: 20,
      repayDate: 20,
      today: 5,
      currentMonthLength: 31
    },
    output: INVALID_RESULT
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 28,
      currentMonthLength: 31
    },
    output: 8
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 2,
      currentMonthLength: 31
    },
    output: 3
  },
  {
    input: {
      billDate: 20,
      repayDate: 5,
      today: 3,
      currentMonthLength: 31
    },
    output: INVALID_RESULT
  }
]

const run = ({input, output}) => {
  test(`input ${JSON.stringify(input, 4, null)}, output is ${output}`, () => {
    expect(getLongestPeriod(input)).toBe(output)
  })
}

testCases.forEach(run)