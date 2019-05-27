export const StatusMap = [
  {
    status: 1,
    statusName: '未还款',
    tipText: '用户激活设备开始，计算押金还款时间',
    tipColor: '#EFF4FF',
    color: '#4288FF'
  },
  {
    status: 2,
    statusName: '还款中',
    tipText: '用户激活设备开始，计算押金还款时间',
    tipColor: '#EFF4FF',
    color: '#4288FF'
  },
  {
    status: 3,
    statusName: '还款完成',
    tipText: '用户激活设备开始，计算押金还款时间',
    tipColor: '#EFF4FF',
    color: '#4288FF'
  },
  {
    status: 4,
    statusName: '活动失败',
    tipText: '到达活动期限，未完成总交易量',
    tipColor: '#FC4E4E',
    color: '#fff'
  }
]

export const moneyRate = obj => {
  if (!obj.depositStagePO.length) {
    return []
  }
  const startPoint = [
    {
      id: 0,
      rate: '0',
      isActived: false
    }
  ]
  const restPointList = obj.depositStagePO.map((v, i) => ({
    id: i + 1,
    rate: Number(v.totalTradeAmt),
    isActived: obj.totalTradeAmtAdd ? obj.totalTradeAmtAdd >= v.totalTradeAmt : false
  }))
  return startPoint.concat(restPointList)
}
