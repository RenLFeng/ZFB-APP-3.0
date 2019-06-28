import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import '@babel/polyfill'
import asyncComponent from './components/AsyncComponent'
import MeasurementCard from './views/MeasurementCard'
import ShareRegister from './views/shareRegister'
import ReturnsDetailed from './views/returnsDetailed/index'
import deviceRepay from './views/partnerAchievement/deviceRepay'
import deviceReceipt from './views/partnerAchievement/deviceReceipt'
import historyAchievement from './views/partnerAchievement/historyAchievement'
import historyAchievementDetail from './views/partnerAchievement/historyAchievementDetail'
import noAchievement from './views/partnerAchievement/noAchievement.jsx'
import partnerDetail from './views/partnerAchievement/partnerDetail'
import merchantDetail from './views/partnerAchievement/merchantDetail'
import personalAchievementList from './views/partnerAchievement/personalAchievementList'
import teamAchievementList from './views/partnerAchievement/teamAchievementList'
import vipAchievement from './views/vipAchievement/index'
import quickRepay from './views/vipAchievement/quickRepay'
import quickReceipt from './views/vipAchievement/quickReceipt'
import vipPersonalAchievementList from './views/vipAchievement/vipPersonalAchievementList'
import vipTeamAchievementList from './views/vipAchievement/vipTeamAchievementList'
import vipDetail from './views/vipAchievement/vipDetail'
import userDetail from './views/vipAchievement/userDetail'
import '../src/public/public.scss'
//合伙人业绩
import PartnerPerformance from './views/partnerAchievement/partnerPerformance'
import VConsole from 'vconsole'
// new VConsole()

// import { PlanDetail } from './views/plan/detail'
// import { CreatePlan } from './views/plan/create'

// const Async = asyncComponent(() => import('./views/deposit'))
// const asyncComponent2 = path => asyncComponent(() => import(path))
// const asyncComponent2 = realtivePath => asyncComponent(() => import(realtivePath))
// import Authorization from './views/authorization'

const RouterMap = [
  {
    path: '/l',
    name: 'login',
    component: asyncComponent(() => import('./views/login/index'))
  },
  {
    path: '/d',
    name: 'demo',
    component: asyncComponent(() => import('./views/demo/index'))
  },
  {
    path: '/MyReward',
    name: 'MyReward',
    component: asyncComponent(() => import('./views/promotionReward/MyReward')),
    hidden: true
  },
  {
    path: '/abc',
    name: 'abc',
    component: asyncComponent(() => import('./views/abc/index')),
    hidden: true
  },
  //我的账户
  {
    path: '/myAccount',
    name: 'myAccount',
    component: asyncComponent(() => import('./views/myAccount/index.jsx'))
  },
  //激活奖励
  {
    path: '/AccountDetails',
    name: 'AccountDetails',
    component: asyncComponent(() => import('./views/AccountDetails/index'))
  },
  {
    path: '/vipData',
    name: 'vipData',
    component: asyncComponent(() => import('./views/vipData/index'))
  },
  {
    path: '/share',
    name: '推荐分享页面-2',
    component: asyncComponent(() => import('./views/QRcode/index'))
  },
  {
    path: '/RewardDescription',
    name: '推荐分享页面-1',
    // component: asyncComponent(() => import('./views/promotionReward/rewardDescription')),
    component: asyncComponent(() => import('./views/QRcode/index'))
  },
  {
    path: '/promotion',
    name: '我的推荐奖励',
    component: asyncComponent(() => import('./views/PromotionAward/index'))
  },
  {
    path: '/withdrawDetail',
    name: '体现记录',
    component: asyncComponent(() => import('./views/myAccount/withdrawDetail'))
  },
  {
    path: '/flowRecord',
    name: '设备流动记录',
    component: asyncComponent(() => import('./views/flowRecord'))
  },
  {
    path: '/toBePartner',
    name: '成为合伙人',
    component: asyncComponent(() => import('./views/toBePartner'))
  },
  {
    path: '/feedback',
    name: '反馈页面',
    component: asyncComponent(() => import('./views/Feedback/index'))
  },
  {
    path: '/createplan',
    name: 'createplan',
    component: asyncComponent(() => import('./views/createPlan'))
  },
  {
    path: '/submitplan',
    name: 'submitplan',
    component: asyncComponent(() => import('./views/createPlan/item'))
  },
  {
    path: '/planItem',
    name: '计划详情页面',
    component: asyncComponent(() => import('./views/createPlan/item'))
  },
  {
    path: '/result',
    name: '结果页面',
    component: asyncComponent(() => import('./views/Result/index'))
  },
  {
    path: '/getItem',
    name: 'getItem',
    component: asyncComponent(() => import('./views/createPlan/getItem'))
  },
  {
    path: '/deposit',
    name: '押金详情',
    component: asyncComponent(() => import('./views/deposit/index'))
  },
  {
    path: '/authorization',
    name: '授权书',
    component: asyncComponent(() => import('./views/authorization'))
  },
  {
    path: '/partnership',
    name: '合伙人合作协议',
    component: asyncComponent(() => import('./views/Partnership'))
  },
  {
    path: '/userAgreement',
    name: '用户注册协议',
    component: asyncComponent(() => import('./views/userAgreement'))
  },
  {
    path: '/shareRegister',
    name: '新用户扫码注册',
    component: asyncComponent(() => import('./views/shareRegister'))
  },
  {
    path: '/orderList',
    name: '订单列表',
    component: asyncComponent(() => import('./views/OrderList'))
  }
]

const RouterList = RouterMap.filter(v => !v.hidden)
class App extends Component {
  // 获取token
  getToken() {
    if (navigator.userAgent === 'youxiangju') {
      const token = window.getLoadData.getToken()
      localStorage.setItem('token',token)
    }
  }
  componentWillMount() {
    this.getToken()
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{ height: '100%' }}>
          {RouterList.map(({ path, name, component }) => (
            <Route path={path} key={name} component={component} />
          ))}
          <Route path="/MeasurementCard" component={MeasurementCard} />
          <Route path="/returnsDetailed" component={ReturnsDetailed} />
          <Route path="/partnerPerformance" component={PartnerPerformance} />
          <Route path="/deviceRepay" component={deviceRepay} />
          <Route path="/historyAchievement" component={historyAchievement} />
          <Route path="/historyAchievementDetail" component={historyAchievementDetail} />
          <Route path="/noAchievement" component={noAchievement} />
          <Route path="/partnerDetail" component={partnerDetail} />
          <Route path="/merchantDetail" component={merchantDetail} />
          <Route path="/deviceReceipt" component={deviceReceipt} />
          <Route path="/personalAchievementList" component={personalAchievementList} />
          <Route path="/teamAchievementList" component={teamAchievementList} />
          <Route path="/vipAchievement" component={vipAchievement} />
          <Route path="/quickRepay" component={quickRepay} />
          <Route path="/quickReceipt" component={quickReceipt} />
          <Route path="/vipPersonalAchievementList" component={vipPersonalAchievementList} />
          <Route path="/vipTeamAchievementList" component={vipTeamAchievementList} />
          <Route path="/vipDetail" component={vipDetail} />
          <Route path="/userDetail" component={userDetail} />
        </div>
      </BrowserRouter>
    )
  }
}

//EquipmentRepayment
function resetFontSize() {
  var windowW = document.documentElement.clientWidth || document.body.clientWidth
  var scale = windowW / 375
  var newSize = 100 * scale
  document.getElementsByTagName('html')[0].style.fontSize = newSize + 'px'
}
window.addEventListener('resize', resetFontSize, false)
resetFontSize()

export default App
