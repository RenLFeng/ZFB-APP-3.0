// 已注册 (5) Registered
// 已认证 (5) Certified
// 已激活 (5) Activated
export const accessTablelist = typeStr => {
  const base = [
    {
      id: 0,
      lable: '用户',
      type: ['Registered', 'Certified', 'Activated']
    },
    {
      id: 1,
      lable: '注册时间',
      type: ['Registered']
    },
    {
      id: 2,
      lable: '奖励金',
      type: ['Certified', 'Activated']
    },
    {
      id: 3,
      lable: '状态',
      type: ['Certified', 'Activated']
    }
  ]
  return base.filter(v => v.type.includes(typeStr))
}

export const accessCatalogList = () => {
  return [
    {
      id: 0,
      lable: '已注册',
      number: 0,
      type: 'Registered'
    },
    {
      id: 1,
      lable: '已认证',
      number: 0,
      type: 'Certified',
      api: '/asdasd/asdasd'
    },
    {
      id: 2,
      lable: '已激活',
      number: 0,
      type: 'Activated'
    }
  ]
}
