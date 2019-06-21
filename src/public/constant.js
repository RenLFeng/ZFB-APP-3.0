import img1 from '../assets/img/profitList/offline_1.png'
import img2 from '../assets/img/profitList/offline_2.png'
import img3 from '../assets/img/profitList/online_1.png'
import img4 from '../assets/img/profitList/serve.png'
import img6 from '../assets/img/profitList/actived.png'
import img7 from '../assets/img/profitList/Recommend.png'

export const IncomeDetailsMAP = {
  device: 1, // 设备收益
  program: 2 // 活动收益
}

export const accessList = obj => {
  return [
    {
      item: '设备还款分润',
      totalEarnings: obj['offline_repay'] ? obj['offline_repay'].totalEarnings : '0.00',
      thisMonth: obj['offline_repay'] ? obj['offline_repay'].monthEarnings : '0.00',
      type: 'EquipmentCollection',
      statisticsType: 2,
      api: '/profit/deviceEarnings',
      img: img1
    },
    {
      item: '设备收款分润',
      totalEarnings: obj['offline_receipt'] ? obj['offline_receipt'].totalEarnings : '0.00',
      thisMonth: obj['offline_receipt'] ? obj['offline_receipt'].monthEarnings : '0.00',
      type: 'EquipmentRepayment',
      statisticsType: 1,
      api: '/profit/deviceEarnings',
      img: img2
    },
    {
      item: '激活奖励',
      type: 'ActivationBonus',
      totalEarnings: obj['activate_pos'] ? obj['activate_pos'].totalEarnings : '0.00',
      thisMonth: obj['activate_pos'] ? obj['activate_pos'].monthEarnings : '0.00',
      statisticsType: 1,
      api: '/profit/reward',
      img: img6
    },
    {
      item: '开通合伙人奖励',
      type: 'openPartner',
      totalEarnings: obj['open_partner'] ? obj['open_partner'].totalEarnings : '0.00',
      thisMonth: obj['open_partner'] ? obj['open_partner'].monthEarnings : '0.00',
      api: '/profit/reward',
      statisticsType: 4,
      img: img7
    },
    {
      item: '服务费',
      type: 'PromotionAward',
      totalEarnings: obj['deposit_pos'] ? obj['deposit_pos'].totalEarnings : '0.00',
      thisMonth: obj['deposit_pos'] ? obj['deposit_pos'].monthEarnings : '0.00',
      statisticsType: 8,
      api: '/profit/reward',
      img: img4
    },
    {
      item: '设备活动分润',
      type: 'PromotionAward',
      totalEarnings: obj['deposit_pos_profit'] ? obj['deposit_pos_profit'].totalEarnings : '0.00',
      thisMonth: obj['deposit_pos_profit'] ? obj['deposit_pos_profit'].monthEarnings : '0.00',
      statisticsType: 7,
      api: '/profit/reward',
      img: img3
    }
  ]
}

export const accessVipAchievement = obj => {
  return [
    {
      VIPpageTitle: '本月还款总交易额(元)',
      thisMonth: obj.monthPaymentsSum || '0.00',
      type: 'QuickRepayment',
      statisticsType: 1,
      api: 'profit/onlineDeviceEarnings',
      item: '快捷还款分润'
    },
    {
      item: '快捷收款分润',
      VIPpageTitle: '本月收款总交易额(元)',
      thisMonth: obj.monthReceivablesSum || '0.00',
      type: 'QuickCollection',
      statisticsType: 2,
      api: 'profit/onlineDeviceEarnings'
    },
    {
      item: '推荐奖励',
      VIPpageTitle: '本月推广奖励收益(元)',
      thisMonth: obj.monthGeneralizeSum || '0.00',
      type: 'PromotionAward',
      statisticsType: 3,
      api: 'profit/onlineDeviceEarnings'
    }
  ]
}
