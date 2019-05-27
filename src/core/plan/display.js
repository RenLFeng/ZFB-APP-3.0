import { objectFromPairs } from '../../public/utils'
export const PLAN_STATUS = {
  PREVIEW: 0,
  RUNNING: 1,
  PAUSED: 2,
  FAILED: 3,
  SUCCESSFUL: 4
}
export const PLAN_STATUS_DESC = {
  [PLAN_STATUS.PREVIEW]: '',
  [PLAN_STATUS.RUNNING]: '执行中',
  [PLAN_STATUS.PAUSED]: '计划暂停',
  [PLAN_STATUS.FAILED]: '异常结束',
  [PLAN_STATUS.SUCCESSFUL]: '正常结束'
}

const TYPEMAP = [[1, 'PAY', '消费'], [2, 'REPAY', '还款'], [3, 'REFUND', '退款']]
export const TASK_TYPE = objectFromPairs(TYPEMAP.map(v => [v[1], v[0]]))
export const TYPE_TEXT = objectFromPairs(TYPEMAP.map(v => [v[0], v[2]]))
const STATUSMAP = [
  [1, 'READY', '未'],
  [2, 'RUNNING', '未'],
  [3, 'FAILED', '失败'],
  [4, 'SUCCESSFUL', '成功']
]

export const TASK_STATUS = objectFromPairs(STATUSMAP.map(v => [v[1], v[0]]))
export const STATUS_TEXT = objectFromPairs(STATUSMAP.map(v => [v[0], v[2]]))
