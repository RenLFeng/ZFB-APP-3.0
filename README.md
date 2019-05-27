## 关于手机端 APP 交互函数

```javascript
window.getLoadData.gobackToMyRootView() // 返回APP我的页面

window.getLoadData.finishTist() // 返回APP上一个页面

window.getLoadData.getToken() // 获取登陆信息的token值

window.getLoadData.jump(next) // 控制 app 跳转到 next, next 值由 url 参数传递

navigator.userAgent === 'youxiangju' //判断webview
```

## H5 项目可用的路由

### /plan/detail

#### 描述

> 计划详情

#### 参数

15770584383

createplan?type=online&&billDate=25&&repayDate=14&&title=%E5%B9%B3%E5%AE%89%E9%93%B6%E8%A1%8C(4469)&&channelKey=TL-A&&channelName=tonglian&&merchantArea=%E5%B9%BF%E4%B8%9C%E7%9C%81%E5%B9%BF%E5%B7%9E%E5%B8%82%E5%A4%A9%E6%B2%B3%E5%8C%BA&&cardNo=6221550918354469

import feedback from './views/Feedback/index'
import result from './views/Result/index'
import getItem from './views/createPlan/getItem'
import deposit from './views/deposit/index'
import createplan from './views/createPlan/index'
import submitplan from './views/createPlan/item'
import planItem from './views/createPlan/item'
import Toast from '../../component/\_toast/index'

path: '/deposit',name: '押金详情',
http://localhost:3100/deposit?id=25794529552

http://localhost:3002/getItem?id=P190423105229974000112
