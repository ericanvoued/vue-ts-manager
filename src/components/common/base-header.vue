<template>
  <div class="header">
    <div class="header-left">
      <h2>鑫鑫支付</h2>
    </div>
    <div class="header-right">
      <span>用户名：{{ globalState.userInfo.username }} &nbsp;&nbsp;|&nbsp;&nbsp;商户名：{{globalState.userInfo.merchant_no}}</span>
      <button>
        <img src="../../assets/icon/text-icon.png" alt /> 对接文档
      </button>
      <button @click="showKeyAlert()">
        <img src="../../assets/icon/viewkey-icon.png" alt />查看密钥
      </button>
      <button @click="changePassword()">
        <img src="../../assets/icon/edit-icon.png" alt />修改密码
      </button>

      <!-- <el-dropdown class="header-dropdown" trigger="hover">
        <span class="el-dropdown-link">
          鑫鑫<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="changePassword()">修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <button class="quit">退出登录</button>
      <div ref="homeAlert" style="width:0;height:0;overflow:hidden;">
        <el-col :span="24">
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">商户名:</el-col>
                <el-col :span="17" class="input-box">
                  <el-input v-model="formModel" placeholder="代理商用户名"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">名称:</el-col>
                <el-col :span="17" class="input-box">
                  <el-input v-model="formModel" placeholder="代理商名称"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="7" class="input-labal">代付密钥:</el-col>
                <el-col :span="17" class="input-box">
                  <el-input type="password" v-model="formModel" placeholder="代付密钥"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="grid-content" :md="24">
              <el-row>
                <el-col :span="8" class="input-labal"><a href="javascript:;">javademo</a></el-col>
                <el-col :span="8" class="input-labal"><a href="javascript:;">javademo</a></el-col>
                <el-col :span="8" class="input-labal"><a href="javascript:;">javademo</a></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class BaseHeader extends Vue {
  @State(state => state) private globalState!: any;
  @Mutation("add_editableTabs") private add_editableTabs: any;
  private formModel: any = "";
  changePassword() {
    this.add_editableTabs({
      title: "修改密码",
      url: `/home/change-password`
    });
    this.$router.push({ path: "/home/change-password" });
  }
  showKeyAlert() {
    let homeAlert: any = this.$refs.homeAlert;
    this.$alert(homeAlert.innerHTML, "查看密钥", {
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
// .header-dropdown{
//   border-radius: 3px;
//     width: 92px;
//     height: 40px;
//     line-height: 40px;
//     background-color: #e3ecf9;
//     margin: 0;
//     padding: 0;
//     color: #5684fa;
//     font-size: 16px;
//     cursor: pointer;
//     /deep/ .el-dropdown-menu__item:not(.is-disabled):hover{
//       background-color: #5584fa;
//       color: #ffffff;
//     }
// }
</style>

<style lang="less">
.home-alert {
  border: none !important;
  /deep/ .el-message-box__header {
    padding-top: 0px !important;
    padding: 0 14px;
    line-height: 58px;
    height: 58px;
    background-color: #5684fa;
    .el-message-box__title {
      line-height: 58px;
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
</style>


