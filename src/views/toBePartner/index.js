import React, { useState, useEffect } from 'react'
import style from './own/css.module.scss'
import { Franchise, Gifts } from './own/constant'
import { FetchPartnerInfo } from '../../public/api'
import { post } from '../../public/call'
import Toast from '../../components/_toast/index'
import Header from '../../components/Header/index'
import img1 from '../../assets/img/tobepartner/jingying@2x.png'
import img2 from '../../assets/img/tobepartner/texu@2x.png'
import img3 from '../../assets/img/tobepartner/tuiguang@2x.png'
import img4 from '../../assets/img/tobepartner/xiaoshou@2x.png'
import img5 from '../../assets/img/tobepartner/fenrun.png'
import img6 from '../../assets/img/tobepartner/shebei.png'

export default function Cunter() {
  const [packageInfo, setPackageInfo] = useState({})
  const jump = () => {
    console.log('jump')
    const body = {
      path: 'ToBePartner',
      goodsName: packageInfo.packageId // 例如： 8
    }
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
        setPackageInfo(res.data)
      }
    } catch (error) {
      console.log(error)
      Toast.info('出错了', 2000)
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <div className={style.layout}>
      <section>
        <Header
          title="智付宝合伙人"
          handleGoBack={handleGoBack}
          whiteArrow
          color="#fff"
          backgroundColor="#373030"
        />
      </section>
      <div className={style.scrollWrap}>
        <div className={style.wrap}>
          <div className={style.circleBg} />
          <div className={style.contentCard}>
            <h4 className={style.title}>
              <p>特许经营权</p> <i />
            </h4>
            <section>
              {Franchise.map(v => (
                <div key={v.id}>
                  <img
                    src={
                      v.src === 'img1'
                        ? img1
                        : v.src === 'img2'
                        ? img2
                        : v.src === 'img3'
                        ? img3
                        : img4
                    }
                    alt=""
                  />
                  {v.info}
                </div>
              ))}
            </section>
          </div>
          <div className={style.Gift}>
            <h4>
              开通有礼 <span>赠送</span>
            </h4>
            {Gifts.map(v => (
              <div key={v.id}>
                <div className={style.giftName}>{v.title}</div>
                <div className={style.giftInfo}>
                  <p>{v.p1}</p>
                  <p>{v.p2}</p>
                </div>
                <div className={style.giftImg}>
                  <img src={v.src === 'img5' ? img5 : img6} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <section>
        <button className={style.btn} onClick={jump}>
          开通 {packageInfo.packagePrice}元
        </button>
      </section>
    </div>
  )
}
