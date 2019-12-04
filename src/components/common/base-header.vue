<template>
  <div class="header">
    <div class="header-left">
      <h2>鑫鑫支付</h2>
    </div>
    <div class="header-right">
      <span>用户名：{{ userInfo.username }} &nbsp;&nbsp;|&nbsp;&nbsp;商户名：{{userInfo.merchant_no}} &nbsp;&nbsp;|&nbsp;&nbsp;当前余额：{{curent_money}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-dropdown class="header-dropdown">
        <span class="el-dropdown-link">
          用户中心<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <!-- <img src="../../assets/icon/text-icon.png" alt /> -->
            对接文档</el-dropdown-item>
          <el-dropdown-item @click.native="showKeyAlert()">
          <!-- <img src="../../assets/icon/viewkey-icon.png" alt /> -->
          查看密钥</el-dropdown-item>
          <el-dropdown-item @click.native="showFeeAlert()">
            <!-- <img src="../../assets/icon/viewkey-icon.png" alt /> -->
            查看费率</el-dropdown-item>
          <!-- <el-dropdown-item @click="calRate()"> -->
            <!-- <img src="../../assets/icon/viewkey-icon.png" alt /> -->
            <!-- 费率计算</el-dropdown-item> -->
          <el-dropdown-item @click.native="changePassword()">
            <!-- <img src="../../assets/icon/edit-icon.png" alt /> -->
            修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="openGoogleQr()">
            <!-- <img src="../../assets/icon/edit-icon.png" alt /> -->
            谷歌验证码</el-dropdown-item>
          <el-dropdown-item @click.native="quitLogin()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <button>
        <img src="../../assets/icon/text-icon.png" alt /> 对接文档
      </button>
      <button @click="showKeyAlert()">
        <img src="../../assets/icon/viewkey-icon.png" alt />查看密钥
      </button>
      <button @click="changePassword()">
        <img src="../../assets/icon/edit-icon.png" alt />修改密码
      </button> -->
      
      <!-- <button class="quit" @click="quitLogin()">退出登录</button> -->
      <div ref="homeAlert" style="width:0;height:0;overflow:hidden;">
        <el-col :span="24">
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">商户名:</el-col>
                <el-col :span="17" class="input-box">
                  <p class="userInfoWrap">{merchantname}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">名称:</el-col>
                <el-col :span="17" class="input-box">
                  <p class="userInfoWrap">{username}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">提现密钥:</el-col>
                <el-col :span="17" class="input-box">
                  <p class="userInfoWrap">{usertoken}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">充值密钥:</el-col>
                <el-col :span="17" class="input-box">
                  <p class="userInfoWrap">{withdraw_key}</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </div>

      <div ref="feeAlert" style="width:0;height:0;overflow:hidden;">
          <div class="fee-wrap">
            <p class="left">微信：</p>
            <p class="right">***</p>
          </div>
          <div class="fee-wrap">
            <p class="left">支付宝：</p>
            <p class="right">***</p>
          </div>
          <div class="fee-wrap">
            <p class="left">云闪付：</p>
            <p class="right">***</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { ApiList } from "../../api/api";
import { currentcy } from "../../config/number"

@Component({
  components: {}
})
export default class BaseHeader extends Vue {
  @State(state => state) private globalState!: any;
  @Mutation("add_editableTabs") private add_editableTabs: any;
  private formModel: any = "";
  private ucLocal: any = sessionStorage.getItem("userInfo")? sessionStorage.getItem("userInfo"):'';
  private userInfo: any = JSON.parse(this.ucLocal);
  private curent_money: any = '0.00';
  private api: any = new ApiList();

  created() {
      this.seeSurplus();
  } 

  quitLogin() {
    let user: any = sessionStorage.getItem("userInfo");
    let params = {
      userid: JSON.parse(user).id
    }
    
    this.$apiList.logOut(params).then((data: any) => {
      if(data.data.code == 0) {
        sessionStorage.removeItem("userInfo");
        this.$router.push('/surface/login');
        this.$message.success(data.data.data.message)
      }else {
        this.$message.warning(data.data.data.message)
      }
      
      console.log(data.data.code)
    })
  }

  seeSurplus() {
    //  let api: any = new ApiList();
     this.api.seeBalance().then((resp:any)=>{
        // this.curent_money = currentcy('1323');
        this.curent_money = currentcy(resp.data[0].balance);
     });
    }

  changePassword() {
    this.add_editableTabs({
      title: "修改密码",
      url: `/home/change-password`
    });
    this.$router.push({ path: "/home/change-password" });
  }
  calRate() {
    this.add_editableTabs({
      title: "费率计算",
      url: `/home/calculate-rate`
    });
    this.$router.push({ path: "/home/calculate-rate" });
  }

  showKeyAlert() {
    let homeAlert: any = this.$refs.homeAlert;
    let alertStr: any =  homeAlert.innerHTML
      .replace('{merchantname}', this.userInfo.merchant_no)
      .replace('{username}', this.userInfo.username)
      .replace('{usertoken}', this.userInfo.deposit_key)
      .replace('{withdraw_key}', this.userInfo.withdraw_key)

    this.$alert(alertStr, "查看密钥", {
      customClass: "home-alert",
      dangerouslyUseHTMLString: true,
      showCancelButton: true,
      closeOnClickModal: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      cancelButtonClass: "alert-concel-btn",
      confirmButtonClass: "alert-confirm-btn",
      center: true
    });
  }

  openGoogleQr() {
    this.add_editableTabs({
      title: "谷歌验证码",
      url: `/home/google-QRcode`
    });
    this.$router.push({ path: "/home/google-QRcode"});
  }

  showFeeAlert(){
    let user: any = sessionStorage.getItem("userInfo");
    let params = {
      userId: JSON.parse(user).id
    }
    let feeAlert: any = this.$refs.feeAlert;
    this.api.searchFeeRate(params).then((data: any) => {
      if(data.status == 200) {
        let str: any = '';
        data.data.data.map((item: any) => {
          str += `<div class="fee-wrap">
                  <p class="left">${ item.gatewayname }:</p>
                  <p class="right">${ item.fee == null? 0: item.fee }</p>
                </div>`;
        })
        feeAlert.innerHTML = str;
        this.$alert(str, "查看费率", {
            customClass: "fee-alert",
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            closeOnClickModal: true,
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            cancelButtonClass: "alert-concel-btn",
            confirmButtonClass: "alert-confirm-btn",
            center: true
          });
      }
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px 0 23px;
  height: 64px;
  background-color: #5684fa;
  color: #fff;
  font-family: "PingFang SC";
  // box-shadow: 0 0 10px #455b90;
  position: relative;
  z-index: 10;
  .header-left {
    font-size: 22px;
  }
  .header-right {
    font-size: 16px;
    font-family: "PingFang SC";
    & > a {
      display: inline-block;
      margin-right: 20px;
      color: #fff;
      text-decoration: none;
    }
    .header-dropdown{
      border-radius: 4px;
      width: 106px;
      height: 40px;
      margin: 0;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
      outline: none;
      background-color: #e3ecf9;
      border: 1px solid #90adf8;
      color: #5684fa;
      transition: all 0.25s;
      line-height: 38px;
      img {
        display: inline-block;
        position: relative;
        top: 3px;
        margin: 0 3px;
      }
    }
    button {
      border-radius: 4px;
      width: 106px;
      height: 40px;
      margin: 0;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
      margin-left: 10px;
      outline: none;
      background-color: transparent;
      border: 1px solid #90adf8;
      color: #eee;
      transition: all 0.25s;
      img {
        display: inline-block;
        position: relative;
        top: 3px;
        margin: 0 3px;
      }
      &:hover {
        background-color: #2c5dda;
        border-color: #2c5dda;
        color: #fff;
      }
      &.quit {
        color: #5684fa;
        background-color: #e3ecf9;
        &:hover {
          filter: brightness(1.1);
        }
      }
    }
  }
}
.fee-wrap{
  display: flex;
  padding: 0 12px;
  .left {
    width: 50%;
    text-align: right;
  }
  .right{
    width: 50%;
    text-align: left;
    text-indent: 8px;
  }
}
</style>

<style lang="less">
.fee-alert{
  border: none !important;
  width: 380px!important;
  .fee-wrap{
    display: flex;
    p{
      width: 50%;
    }
    .left{
      text-align: right;
    }
    .right{
      text-align: left;
      text-indent: 7px;
    }
  }
  /deep/ .el-message-box__header {
    padding-top: 0px !important;
    padding: 0 14px;
    line-height: 48px;
    height: 48px;
    background-color: #5684fa;
    .el-message-box__title {
      line-height: 48px;
      color: #fff;
      justify-content: flex-start;
    }
  }
  /deep/ .el-message-box__close{
    color: #fff!important;
    font-size: 24px;
  }
  /deep/ .grid-content{
    margin-bottom: 10px;
    .input-labal{
      line-height: 40px;
      text-align: right;
      padding-right: 5px;
      a{
        color: #333;
        text-decoration: none;
        &:hover{
          color: #5684fa;
        }
      }
    }
  }
}
.home-alert {
  border: none !important;
  width: 480px!important;
  /deep/ .el-message-box__header {
    padding-top: 0px !important;
    padding: 0 14px;
    line-height: 48px;
    height: 48px;
    background-color: #5684fa;
    .el-message-box__title {
      line-height: 48px;
      color: #fff;
      justify-content: flex-start;
    }
  }
  /deep/ .el-message-box__close{
    color: #fff!important;
    font-size: 24px;
  }
  /deep/ .grid-content{
    margin-bottom: 10px;
    .input-labal{
      line-height: 40px;
      text-align: right;
      padding-right: 5px;
      a{
        color: #333;
        text-decoration: none;
        &:hover{
          color: #5684fa;
        }
      }
    }
  }
}
.alert-confirm-btn{
  background-color: #5684fa!important;
  border-color: #5684fa!important;
}
.alert-concel-btn{
  border-color: #5684fa!important;
  color: #5684fa!important;
}
.userInfoWrap{
  line-height: 38px!important;
  height: 40px;
  margin-left: 5px;
  text-align: left;
  border: 1px solid #ddd;
  border-radius: 3px;
  text-indent: 7px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


