const tabLevelTwoTypeOne = [
  {
    name: '全部',
    icon: '',
    id: 1
  },
  {
    name: '还款分润',
    icon: '',
    id: 2
  },
  {
    name: '收款分润',
    icon: '',
    id: 3
  }
]

const tabLevelTwoTypeTwo = [
  {
    name: '全部',
    icon: '',
    id: 1
  },
  {
    name: '平台购机',
    icon: '',
    id: 2
  },
  {
    name: '激活奖励',
    icon: '',
    id: 3
  },
  {
    name: '推广奖励',
    icon: '',
    id: 4,
    hidden: true
  }
].filter(v => v.hidden !== true)

export const tabLevelOne = [
  {
    name: '设备收益',
    iconName: 'equipImg',
    id: 1,
    sub: tabLevelTwoTypeOne
  },
  {
    name: '快捷收益',
    iconName: 'quickImg',
    id: 2,
    hidden: true,
    sub: tabLevelTwoTypeOne
  },
  {
    name: '活动收益',
    iconName: 'activityImg',
    id: 3,
    sub: tabLevelTwoTypeTwo
  }
].filter(v => v.hidden !== true)

export const profitTypeMAP = {
  '1': '收款',
  '2': '还款'
}

export const programTypeMAP = {
  '1': '激活奖励',
  '3': '平台购机'
}

export const SettlementMAP = {
  1: ['日结', '任务订单'],
  2: ['月结', '订单号']
}

export const vaildFilter = arr => arr.filter(v => !v.hidden)
