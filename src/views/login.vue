<template>
  <div class="login-container">
    <div class="login-main">
      <div class="form-main">
        <h2 class="login-title">用户登录</h2>
        <div action class="login-form">
          <div class="form-wrap">
            <input class="username" v-model="username" type="text" @keypress.enter="submitLogin()" placeholder="用户名" />
          </div>
          <div class="form-wrap">
            <input class="password" v-model="password" type="password" @keypress.enter="submitLogin()" placeholder="密码" />
          </div>
          <div class="form-wrap">
            <input class="checkcode" v-model="checkcode" type="text" @keypress.enter="submitLogin()" placeholder="验证码" />
            <canvas @click="refreshCode()" id="checkcodeCanvas"></canvas>
          </div>
          <div class="form-wrap">
            <button 
              @click="submitLogin()"
              v-loading.fullscreen.lock="fullscreenLoading"
            >提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from 'vuex-class';
import { ApiList } from '../api/api';
import { Md5 } from 'ts-md5';

@Component
export default class LoginPage extends Vue {
  @Mutation("set_userInfo") private set_userInfo: any;
  private username: String = "";
  private password: String = "";
  private checkcode: String = "";
  private fullscreenLoading:any =  false
  private identifyCodes: any = "1234567890";
  private identifyCode: any = "1234";
  private fontSizeMin: any = 30;
  private fontSizeMax: any = 40;
  private backgroundColorMin: any = 180;
  private backgroundColorMax: any = 240;
  private colorMin: any = 50;
  private colorMax: any = 160;
  private lineColorMin: any = 40;
  private lineColorMax: any = 180;
  private dotColorMin: any = 0;
  private dotColorMax: any = 255;
  private contentWidth: any = 140;
  private contentHeight: any = 55;
  private apiList = new ApiList();
  mounted() {
    this.refreshCode();
    // document.addEventListener('keydown', (e: any) => {
    //   if(e.keyCode == 13) {
    //     this.submitLogin();
    //   }
    // })
  }
  submitLogin() {
    if (this.username.length == 0) {
      this.$message.error("请输入用户名");
      return;
    }
    if (this.username.length >= 15) {
      this.$message.error("用户名太长啦");
      return;
    }
    if (this.password.length == 0) {
      this.$message.error("请输入密码");
      return;
    }
    if (this.password.length > 16 || this.password.length < 6) {
      this.$message.error("请输入6到16位的密码");
      return;
    }
    if (this.checkcode.length == 0) {
      this.$message.error("请输入验证码");
      return;
    }
    if (this.checkcode != this.identifyCode) {
      this.$message.error("请输入正确的验证码");
      this.refreshCode();
      return;
    }
    this.fullscreenLoading = true;
    this.apiList.login({
      username: this.username,
      password: Md5.hashStr(this.password + ''),
      code: this.checkcode
    }).then((data: any) => {
      console.log(data)
      this.fullscreenLoading = false;
      if(data.data.code == 1) {
        this.set_userInfo(data.data.data)
        sessionStorage.setItem("userInfo", JSON.stringify(data.data.data));
        this.$router.push({path: '/home/table'})
      }
      if(data.data.code == 0) {
        this.$message.error(data.data.data.message);
      }
      this.refreshCode();
    },(error: any) => {
      this.fullscreenLoading = false;
      this.refreshCode();
      throw error;
    }).catch((error: any) => {
      this.fullscreenLoading = false;
      this.refreshCode();
      this.$message.error(error)
    })

  }
  refreshCode() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
  makeCode(o: any, l: any) {
    for (let i: any = 0; i < l; i++) {
      this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
      ];
    }
    this.drawPic();
  }
  // 生成一个随机数
  randomNum(min: any, max: any) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // 生成一个随机的颜色
  randomColor(min: any, max: any) {
    let r: any = this.randomNum(min, max);
    let g: any = this.randomNum(min, max);
    let b: any = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  drawPic() {
    let canvas: any = document.getElementById("checkcodeCanvas");
    canvas.width = 140;
    canvas.height = 55;
    let ctx: any = canvas.getContext("2d");
    ctx.textBaseline = "bottom";
    // 绘制背景
    ctx.fillStyle = this.randomColor(
      this.backgroundColorMin,
      this.backgroundColorMax
    );
    ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
    // 绘制文字
    for (let i: any = 0; i < this.identifyCode.length; i++) {
      this.drawText(ctx, this.identifyCode[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  }
  drawText(ctx: any, txt: any, i: any) {
    ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
    ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei";
    let x: any = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
    let y: any = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
    let deg: any = this.randomNum(-45, 45);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }
  drawLine(ctx: any) {
    // 绘制干扰线
    for (let i: any = 0; i < 8; i++) {
      ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.lineTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.stroke();
    }
  }
  drawDot(ctx: any) {
    // 绘制干扰点
    for (let i: any = 0; i < 100; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url("../assets/login-bg.png") center top no-repeat;
  background-size: 1920px 1080px;
  width: 100%;
  height: 100%;
  text-align: left;
  .form-wrap {
    height: 68px;
    line-height: 66px;
    position: relative;
    #checkcodeCanvas {
      position: absolute;
      width: 140px;
      height: 50px;
      top: 9px;
      right: 20px;
    }
    input,
    button {
      height: 100%;
      width: 100%;
      margin: 0;
      border: 1px solid #dfdfdf;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
      font-size: 18px;
      font-family: "Yuanti SC";
      outline: none;
      text-indent: 82px;
      background-position: 30px center;
      background-repeat: no-repeat;
      transition: all 0.25;
    }
    input:focus {
      border-color: #5684fa;
      box-shadow: 0 0 10px rgba(86, 132, 250, 0.15);
    }
    button {
      background-color: #5684fa;
      color: #fff;
      text-align: center;
      border: none;
      padding: 0;
      cursor: pointer;
      text-indent: 0;
    }
    .username {
      background-image: url("../assets/icon/user-icon.png");
    }
    .password {
      background-image: url("../assets/icon/password-icon.png");
    }
    .checkcode {
      background-image: url("../assets/icon/checkcode-icon.png");
    }
    margin-bottom: 16px;
  }
  .login-main {
    max-width: 1480px;
    margin: 0 auto;
    height: 100%;
  }
  .login-title {
    line-height: 52px;
    font-size: 24px;
    font-family: "PingFang SC";
    color: rgb(51, 51, 51);
    margin-bottom: 56px;
  }
  .form-main {
    width: 520px;
    margin-right: 30px;
    margin-top: 250px;
    float: right;
  }
}
</style>


