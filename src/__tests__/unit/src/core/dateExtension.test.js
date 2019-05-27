const { getMonthLength } = require('../../../../core/dateExtension')

test('get month length', () => {
  const lens = Array.of(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
  const months = Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
  let index = 0
  months.forEach(month => {
    expect(getMonthLength({ year: 2018, monthDisplay: month})).toBe(lens[index++])
  })
})