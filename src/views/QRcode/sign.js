import React, { Component } from 'react'
import Header from '../../components/Header/index'
import css from './css.module.scss'
import html2canvas from 'html2canvas'
import logoPng from '../../assets/img/logo.png'
import { post } from '../../store/requestFacade'
import { build } from '../../store/qrCode'
import $ from 'jquery'
import { request } from 'http';
export default class index extends Component {
  state = {
    username: '',
    phone: '',
    qrcode: '',
    imgBase64: '',
    singData:[
      {
        titType:'交易金额',
        itemType:'2010'
      },
      {
        titType:'交易金额',
        itemType:'2010'
      },{
        titType:'交易金额',
        itemType:'2010'
      },{
        titType:'交易金额',
        itemType:'2010'
      },{
        titType:'交易金额',
        itemType:'2010'
      },
      {
        titType:'交易金额',
        itemType:'2010'
      }
    ],
  }
  //获取数据
  getSigninfo = async (imgBase64) => {   
    try {
      const res = await post({
        url: 'user/invitation',
      })
      this.setState({
        singData: res.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
  //提交pic
  setInfo= async (imgBase64) => {   
    try {
      const res = await post({
        url: 'user/invitation',
        data:{
          imgBase64:imgBase64
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount() {
    //初始化数据
      // this.getSigninfo() 

    var image='';
    var mousePressed = false;
    var lastX, lastY;
    var ctx = document.getElementById('myCanvas').getContext("2d");
    var c = document.getElementById("myCanvas");
    //		console.log(c)
    //		console.log(c2)
    var control = document.getElementsByClassName("control")[0];
    var saveimgs = document.getElementsByClassName("saveimgs")[0];
    window.onload = function(){
         var _width = $('#canvas-box').width();
		 $('#myCanvas').attr('width', _width);  //适配移动端宽度给canvas
        InitThis();
    }
 
    function saveImageInfo(){
        image = c.toDataURL("image/png"); //得到生成后的签名base64位  url 地址
		console.log(image); 
    }
 

    function InitThis() {
//			触摸屏
        c.addEventListener('touchstart', function (event) {
            if (event.targetTouches.length == 1) {
                event.preventDefault();// 阻止浏览器默认事件，重要
                var touch = event.targetTouches[0];
                mousePressed = true;
                Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, false);
            }
 
        },false);
 
        c.addEventListener('touchmove', function (event) {
            if (event.targetTouches.length == 1) {
                event.preventDefault();// 阻止浏览器默认事件，重要
                var touch = event.targetTouches[0];
                if (mousePressed) {
                    Draw(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, true);
                }
            }
 
        },false);
 
        c.addEventListener('touchend', function (event) {
            if (event.targetTouches.length == 1) {
                event.preventDefault();// 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
//      			var touch = event.targetTouches[0];
                mousePressed = false;
            }
        },false);
        /*c.addEventListener('touchcancel', function (event) {
            console.log(4)
            mousePressed = false;
        },false);*/
 
 
 
//		   鼠标
        c.onmousedown = function (event) {
            mousePressed = true;
            Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, false);
        };
 
        c.onmousemove = function (event) {
            if (mousePressed) {
                Draw(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
            }
        };
 
        c.onmouseup = function (event) {
            mousePressed = false;
        };
    }
 
    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
			ctx.strokeStyle ='#000'; //颜色
            ctx.lineWidth = 3;   //线宽
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x; lastY = y;
    }
 
  //  clearArea =()=> {
  //       // Use the identity matrix while clearing the canvas
  //       ctx.setTransform(1, 0, 0, 1, 0, 0);
  //       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   };
  }
  
  handleGoBack = () => {
    window.getLoadData.finishTist()
  }
  savPicFn = () => {
    html2canvas(document.querySelector("body")).then(canvas => {

      let imgUrl = canvas.toDataURL('image/png', 1); // 此方法可以设置截图质量0-1
      console.log(imgUrl);
      this.setState({
        imgBase64: imgUrl
      },()=>{
        //保存提交数据
        // this.savInfo(this.setState.imgBase64);
      })
  });
  }

  render() {
    const { username, phone, qrcode, singData} = this.state
    const number = [...phone]
    return (
      <div className={css.share}>
        <Header
          title="电子签购单"
          handleGoBack={this.handleGoBack}
          whiteArrow
          color="#fff"
          backgroundColor="#457FFA"
          sav
          savFn={this.savPicFn}
        />
        <div className={css.sing}>
          <div className={css.tit}>
            <p>签购单</p>
            <div>
                <p>持卡人存根</p>
                <p>DGDGDG</p>
            </div>
          </div>
          <ul className={css.lists}>
              {
                singData.map((item,index)=>(
                  <li key={index}>
                    <span className={css.t1}>{item.titType}</span>
                    <span className={css.t2}>{item.itemType}</span>
                    </li>
                ))
              }
            </ul>
          <div className={css.singtext}>
            <p><span className={css.t1}>持卡签名</span></p>
            <canvas id="myCanvas"></canvas>
            {/* <button type="button" class="btn btn-primary" onClick={this.clearArea}>清空画板</button> */}
          </div>
        </div>
      </div>
    )
  }
}
