const { groupByDate } = require('../../../../../core/plan/display')

const tasks = [
  { toExecuteTime: new Date(2018, 11, 9).getTime() },
  { toExecuteTime: new Date(2018, 11, 11).getTime() },
  { toExecuteTime: new Date(2018, 11, 11).getTime() },
  { toExecuteTime: new Date(2018, 11, 13).getTime() },
  { toExecuteTime: new Date(2018, 11, 13).getTime() },
  { toExecuteTime: new Date(2018, 11, 13).getTime() }
]

const result = [
  {
    date: '2018-12-09',
    tasks: [
      { toExecuteTime: new Date(2018, 11, 9).getTime() }
    ]
  },
  {
    date: '2018-12-11',
    tasks: [
      { toExecuteTime: new Date(2018, 11, 11).getTime() },
      { toExecuteTime: new Date(2018, 11, 11).getTime() }
    ]
  },
  {
    date: '2018-12-13',
    tasks: [
      { toExecuteTime: new Date(2018, 11, 13).getTime() },
      { toExecuteTime: new Date(2018, 11, 13).getTime() },
      { toExecuteTime: new Date(2018, 11, 13).getTime() }
    ]
  }
]

test('group by date', () => {
  expect(groupByDate(tasks)).toEqual(result)
})