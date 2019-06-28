import React from 'react';
import { post } from '../../store/requestFacade';
import Toast from '../../components/_toast/index';
import Dialog from '../../components/Dialog2/index'
export default class page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isShow:false,
        }
    };
    /* *************
            组件挂载 ****************/

    //在组件挂载到DOM前调用，且只会被调用一次
    componentWillMount() {
        // alert('组件挂载前')
    };
    //组件挂载到DOM后调用，且只会被调用一次
    componentDidMount() {
        // alert('组件挂载后');
        this.fetch();
    };
    Dialog = () => {
        // alert(0)
        this.setState({isShow:!this.state.isShow})
    };
    fetch = async () => {
        try {
            const res = await post({
                url: 'posPackage/getPartnerQuery',
                data: {}
            })
            if (res.retCode === '0000') {
                console.log('res: ', res)
                Toast.success();
                this.setState({
                    text: '组件挂载后'
                },()=>{
                    // alert('sdsdgdgdg')
                })
            }
        } catch (error) {
            console.log(error)
            Toast.success()
        }
    }
    // // 解决父组件render子组件也渲染的问题
    // shouldComponentUpdate(nextStates){ 
    //     // if(nextStates.age === this.state.age){
    //     //     return false
    //     // }
    // }
    // 渲染出页面DOM
    render() {
        const  html=' <div>内容uytuytutyu</div>'
        return (
            <div>
                <div>
                    <h1>Dialog</h1>
                    <button onClick={this.Dialog}>click</button>
                    <Dialog handleClose={this.Dialog} isShow={this.state.isShow} text='确定' children='标题' showHtml={html}/>
                </div>
                {/* <div>
                    <h1>toast</h1>
                    <button onClick={this.Dialog}>click</button>
                    <Dialog handleClose={this.Dialog} isShow={this.state.isShow} text='确定' />
                </div> */}
            </div>
        )
    };
    //组件卸载
    componentWillUnmount() {
        alert('组件卸载');
    }
}