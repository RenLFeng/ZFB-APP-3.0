import React, { useState, useEffect } from 'react'
import style from './own/css.module.scss'
import { Franchise, Gifts } from './own/constant'
import { FetchPartnerInfo } from '../../public/api'
import { post } from '../../public/call'
import Empty from '../../components/Empty/index'
import Toast from '../../components/_toast/index'
import Header from '../../components/Header/index'
import _1 from '../../assets/img/tobepartner/_1.png'
import _2 from '../../assets/img/tobepartner/_2.png'
import _3 from '../../assets/img/tobepartner/_3.png'
import _4 from '../../assets/img/tobepartner/_4.png'
import _5 from '../../assets/img/tobepartner/_5.png'
import _6 from '../../assets/img/tobepartner/_6.png'
import bg from '../../assets/img/hehuoren_bg.png'
import device from '../../assets/img/tobepartner/device_4.png'
export default function Cunter() {
  const [packageInfo, setPackageInfo] = useState({})
  const [meallist, setmeallist] = useState([])
  const [showDevice, setShowDevice] = useState(false)
  //选择套餐 并跳转原生
  const jump = (v) => {
    console.log(v)
    const body = {
      path: 'ToBePartner',
      goodsName: v.packageId // 例如： 8
    }
    setShowDevice(!showDevice)
    window.getLoadData.jumpWithPara(JSON.stringify(body))
  }
  const handleGoBack = () => {
    window.getLoadData.jump('homePage')
  }
  const fetch = async () => {
    try {
      const res = await post({
        url: FetchPartnerInfo,
        data: {}
      })
      if (res.retCode === '0000') {
        console.log('res: ', res)
        // setPackageInfo(res.data)
        setmeallist(res.data)
      }
    } catch (error) {
      console.log(error)
      Toast.info('出错了', 2000)
    }
  }
  //显示套餐
  const selectFn = () => {
    setShowDevice(!showDevice)
    console.log(showDevice);
  }
   const numFilter =(value)=> {
    let tempVal = parseFloat(value).toFixed(3)
    let realVal = tempVal.substring(0, tempVal.length - 1)
    return realVal
  }

  const  filter = (num)=>{
    if(num)
    {
      
        num = num.toString().replace(/\$|\,/g,'');
      
        if(''==num || isNaN(num)){return 'Not a Number ! ';}
      
        var sign = num.indexOf("-")> 0 ? '-' : '';
      
        var cents = num.indexOf(".")> 0 ? num.substr(num.indexOf(".")) : '';
        cents = cents.length>1 ? cents : '' ;
  
        num = num.indexOf(".")>0 ? num.substring(0,(num.indexOf("."))) : num ;
      
        if('' == cents){ if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
       
        else{if(num.length>1 && '0' == num.substr(0,1)){return 'Not a Number ! ';}}
  
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        {
            num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
        }
  
        return (sign + num + cents);    
    }
  }
  useEffect(() => {
    fetch();
  }, [])
  return (
    <div className={style.layout}>
      <section>
        <Header
          title=""
          handleGoBack={handleGoBack}
          whiteArrow
          color="#fff"
          backgroundColor="#37303004"
        />
      </section>
      <div className={style.scrollWrap}>
        <div className={style.circleBg}>
          <img src={bg} alt="" />
        </div>
        <div className={style.contentCard}>
          <h4 className={style.title}>
            <p>特许经营权</p>
          </h4>
          <section>
            {Franchise.map(v => (
              <div key={v.id}>
                <img src={v.id === 1 ? _1 : v.id === 2 ? _2 : v.id === 3 ? _3 : _4} alt="" />
                {v.info}
              </div>
            ))}
          </section>
        </div>
        <div style={{ width: '100%', height: '5px', backgroundColor: 'rgb(247, 247, 247)' }} />
        <div className={style.Gift}>
          <h4 className={style.title}>
            合伙人权益<span>赠送</span>
          </h4>
          {Gifts.map(v => (
            <div key={v.id}>
              <div className={style.giftImg}>
                <img src={v.src === '_5' ? _5 : _6} alt="" />
                {v.src === '_5' ? (
                  <p>{v.p1}</p>
                ) : (
                  <>
                    <div>
                      <p>{v.p1}</p>
                      <p style={{ color: '#949494', fontSize: '12px' }}>{v.p2}</p>
                    </div>
                  </>
                )}
              </div>
              <div className={style.giftName}>{v.title}</div>
            </div>
          ))}
        </div>
        <div style={{ width: '100%', height: '5px', backgroundColor: 'rgb(247, 247, 247)' }} />
        <div className={showDevice==true?'overlay acttive':'overlay'}>
          <div className={showDevice==true?'list_items show':'list_items'}>
            <p className="tit">选择套餐 <span className="delet"  onClick={selectFn}>x</span></p>
            <ul>
              {
                meallist.map((item,index)=>(
                  <li className="item" key={index} onClick={()=>jump(item)}>
                    <img src={item.smallPic} alt="" />
                    <span className="title">
                        {item.packageName}
                    </span>
                    <span className={style.price}>
                        {filter(numFilter(item.packagePrice))}元 <i className="nub">/{item.deviceNum}台</i> 
                    </span>
              </li>
                ))
              }
            </ul>
        </div>
        </div>
      </div>
      <section className={style.btn} onClick={selectFn}>
        开通合伙人
      </section>
    </div>
  )
}
