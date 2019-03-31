<!--第五部分 电子签名加密-->

<template>
  <div id="ESignature">
    <mt-header fixed title="（5 / 5）电子签名加密">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="canvasBox" ref="canvasHW">
      <canvas @touchstart='touchStart'
              @touchmove='touchMove'
              @touchend='touchEnd'
              ref="canvasF"
              @mousedown="mouseDown"
              @mousemove="mouseMove"
              @mouseup="mouseUp"></canvas>
      <div class="btnBox">
        <button @click="overwrite">重写</button>
        <button @click="go">提交签名</button>
      </div>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtHeader from 'mint-ui/packages/header/src/header'
import MtButton from 'mint-ui/packages/button/src/button';
import { MessageBox } from 'mint-ui'
import {setSignature} from '../../../utils/stuAPI';
import Cookies from 'js-cookie';

export default {
  name: 'ESignature',
  components: {MtButton, MtHeader},
  data () {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false
    }
  },
  mounted () {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 60;
    canvas.width = this.$refs.canvasHW.offsetWidth - 10;
    this.canvasTxt = canvas.getContext('2d')
  },
  methods: {
    warn: function () {
      MessageBox.alert('', {
        title: '提示',
        message: '你已完成前阶段任务，无法返回'
      })
    },
    // 电脑设备事件
    mouseDown (ev) {
      ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if (1) {
        let obj = {
          x:ev.offsetX,
          y:ev.offsetY
        };
        console.log(obj);
        this.startX=obj.x;
        this.startY=obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown=true;
      }
    },
    //移动设备事件
    touchStart(ev){
      ev = ev || event;
      ev.preventDefault();
      if(ev.touches.length === 1) {
        let obj={
          x:ev.targetTouches[0].clientX,
          y:ev.targetTouches[0].clientY-48
        };
        this.startX=obj.x;
        this.startY=obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove(ev){
      ev = ev || event;
      ev.preventDefault();
      if(this.isDown){
        let obj={
          x:ev.offsetX,
          y:ev.offsetY
        };
        this.moveY=obj.y;
        this.moveX=obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY=obj.y;
        this.startX=obj.x;
        this.points.push(obj);
      }
    },
    //移动设备事件
    touchMove(ev){
      ev = ev || event;
      ev.preventDefault();
      if(ev.touches.length === 1) {
        let obj={
          x:ev.targetTouches[0].clientX,
          y:ev.targetTouches[0].clientY-48
        };
        this.moveY=obj.y;
        this.moveX=obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY=obj.y;
        this.startX=obj.x;
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseUp(ev){
      ev = ev || event;
      ev.preventDefault();
      if(1){
        let obj={
          x:ev.offsetX,
          y:ev.offsetY
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({x:-1,y:-1});
        this.isDown=false;
      }
    },
    //移动设备事件
    touchEnd(ev){
      ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if(ev.touches.length === 1) {
        let obj={
          x:ev.targetTouches[0].clientX,
          y:ev.targetTouches[0].clientY-48
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({x:-1,y:-1});
      }
    },
    //重写
    overwrite(){
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
      this.points=[];
    },
    //保存
    save() {
      let url = this.$refs.canvasF.toDataURL('image/png');
      console.log(url.length);
      setSignature({
        signature: url
      }).then(res =>{
        if (res.succeed === true){
          Cookies.remove('id');
          this.$router.push('/end')
        }
      }).catch(err =>{
        console.log(err)
      })
    },
    // base64的url转file
    dataURLtoFile(dataURL, filename) {
      let arr = dataURL.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bStr = atob(arr[1]);
      let n = bStr.length;
      let u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bStr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    },
    go(){
      this.$router.push('/end')
    }
  }
}
</script>

<style scoped src="./ESignature.css">

</style>
