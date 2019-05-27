import bill from '../../assets/img/plan/bill.png'
import turnover from '../../assets/img/plan/turnover.png'
import ServiceCharge from '../../assets/img/plan/ServiceCharge.png'
import repay from '../../assets/img/plan/repay.png'

export const accessPlanBaseData = obj => {
  const list = [
    {
      id: 0,
      lable: '账单日',
      value: obj.billDate || 0,
      unit: '日'
    },
    {
      id: 1,
      lable: '还款日',
      value: obj.repayDate || 0,
      unit: '日'
    },
    {
      id: 2,
      lable: '通道名称',
      value: obj.channelName || '',
      unit: '',
      type: 'online'
    },
    {
      id: 3,
      lable: '商户区域',
      value: obj.merchantArea || '',
      unit: '',
      type: 'offline'
    }
  ]
  return list.filter(v => !v.type || v.type === obj.type)
}

export const planMethods = number => {
  return [
    {
      id: 0,
      rate: 5,
      text: '5% 普通还款',
      Interval: [13, Math.max(number, 13)],
      available: number - 13 >= 0
    },
    {
      id: 1,
      rate: 10,
      text: '10% 精致还款',
      Interval: [6, Math.min(12, number)],
      available: number - 6 >= 0
    },
    {
      id: 2,
      rate: 20,
      text: '20% 优质还款',
      Interval: [3, Math.min(5, number)],
      available: number - 3 >= 0
    }
  ]
}

export const accessItemById = (arr, id) => arr.filter(v => v.id === id)

export const planDetailsOutlineData = obj => {
  return [
    {
      id: 0,
      label: '还款金额',
      value: obj.totalAmount,
      unit: '元',
      src: bill
    },
    {
      id: 1,
      label: '周转金',
      value: obj.workingAmount,
      unit: '元',
      src: turnover
    },
    {
      id: 2,
      label: '还款手续费',
      value: obj.payCostTotal,
      unit: '元',
      src: ServiceCharge
    },
    {
      id: 3,
      label: '还款笔数',
      value: obj.repayCount,
      unit: '笔',
      src: repay
    }
  ]
}

export const statusMap = {
  0: '',
  1: '执行中',
  2: '计划暂停',
  3: '异常结束',
  4: '正常结束'
}

export const tableInfoList = obj => {
  const list = [
    {
      id: 0,
      label: '计划单号',
      value: obj.planId,
      show: true,
      unit: ''
    },
    {
      id: 1,
      label: '还款天数',
      value: obj.planLength,
      show: true,
      unit: '天'
    },
    {
      id: 2,
      label: '计划状态',
      code: obj.status,
      value: statusMap[obj.status],
      show: true,
      unit: ''
    },
    {
      id: 3,
      label: '周转余额',
      value: obj.tail,
      show: [1, 2].includes(obj.status),
      unit: '元'
    },
    {
      id: 4,
      label: !!obj.refund ? (obj.refund.done ? '退款金额' : '退款中') : '退款金额',
      value: !!obj.refund ? obj.refund.amount : '0',
      show: Number(obj.status) === 3,
      unit: '元'
    }
  ]
  return list.filter(v => v.show)
}
