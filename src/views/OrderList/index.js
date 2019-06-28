import React from 'react';
// import '../../assets/css/common.css'
// import '../../assets/css/header.css'
// import '../../assets/css/myAccount.css'
import { filter, numFilter } from '../../public/utils'
import Header from '../../components/Header/index'
import Empty from '../Empty/index'
import { post } from '../../store/requestFacade';
import Toast from '../../components/_toast/index';
import Dialog from '../../components/Dialog2/index';
import style from './index.module.scss';
document.querySelector('body').style.background='#F1F1F1';
export default class page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            orderlist: [1],

        }
    };
    /* *************
            组件挂载 ****************/

    //在组件挂载到DOM前调用，且只会被调用一次
    componentWillMount() {

    };
    //组件挂载到DOM后调用，且只会被调用一次
    componentDidMount() {
        this.fetch();
    };
    //返回APP上一页
    handleGoBack = () => {
        window.getLoadData.finishTist()
    }
    //go详情页
    listAllInfoFn = (item) => {
        console.log(item);
    }
    //确认发货弹框
    Dialog = () => {
        this.setState({ isShow: !this.state.isShow })
    };
    fetch = async () => {
        try {
            const res = await post({
                url: 'posPackage/getPartnerQuery',
                data: {}
            })
            if (res.retCode === '0000') {
                console.log('res: ', res);
                Toast.success();
                this.setState({
                    orderlist: res.data
                })
            }
        } catch (error) {
            console.log(error)
            Toast.success()
        }
    }
    // 渲染出页面DOM
    render() {
        const { orderlist } = this.state;
        return (
            <div className={style.orderlist}>
                <Header
                    title="订单列表"
                    handleGoBack={this.handleGoBack}
                    color="#000"
                    backgroundColor="#fff"
                />
                {this.state.orderlist.length ? (
                    <div className={style.container}>
                        <p className={style.titleLabel}><span className={style.act}>我的订单</span><span>商户订单</span></p>
                        <div className={style.backgroundColor}></div>
                        <div className={style.list_items}>
                            <ul>
                                {
                                    orderlist.map((item, index) => (
                                        <div className={style.itembox}>
                                            <p className={style.top}><span>订单号：8888888888888</span><span className={style.right}>2018-03-03  20:30</span></p>
                                            <li className={style.item} key={index} onClick={this.listAllInfoFn(item)}>
                                                <img src={item.smallPic} alt="" />
                                                <span className={style.title}>
                                                    {item.packageName}
                                                </span>
                                                <span className={style.price}>
                                                    {filter(numFilter(item.packagePrice))}元 <i className={style.nub}>/{item.deviceNum}台</i>
                                                </span>
                                            </li>
                                            <p className={style.bottom}><span>设备号：ZFB -001</span><span className={style.right}>总价：<i className={style.price}>{filter(numFilter(item.packagePrice))}元</i></span></p>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                        <Dialog handleClose={this.Dialog} isShow={this.state.isShow} text='确定' children='标题'>
                            <div className='dialog'>
                                <h1>订单发货</h1>
                                <ul>
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                </ul>
                            </div>
                        </Dialog>
                    </div>
                ) : (
                        <Empty text="暂无订单" />
                    )}
            </div>
        )
    };
    //组件卸载
    componentWillUnmount() {
        alert('组件卸载');
    }
}