<template>
  <div class="bankcard-alert" v-if="addbackcardflag">
    <div class="bankcard-alert-container clearfix">
        <h2>新增下发银行卡信息 <span @click="closeAlert()" class="close-alert el-icon-close"></span></h2>
      <el-col :span="24">
        <el-row>
          <el-col class="grid-content" :md="24">
            <el-row>
              <el-col :span="7" class="input-labal">银行卡号:</el-col>
              <el-col :span="17" class="input-box">
                <el-input v-model="bankcardObj.bankcardNo" placeholder="代理商用户名"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="grid-content" :md="24">
            <el-row>
              <el-col :span="7" class="input-labal">银行名称:</el-col>
              <el-col :span="17" class="input-box">
                <el-input v-model="bankcardObj.bandcarkName" placeholder="代理商用户名"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="grid-content" :md="24">
            <el-row>
              <el-col :span="7" class="input-labal">账户名称:</el-col>
              <el-col :span="17" class="input-box">
                <el-input v-model="bankcardObj.accountName" placeholder="代理商用户名"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="grid-content" :md="24">
            <el-row>
              <el-col :span="7" class="input-labal">开户行地址:</el-col>
              <el-col :span="17" class="input-box">
                <el-input v-model="bankcardObj.accountAddress" placeholder="代理商用户名"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="grid-content" :md="24">
            <el-row>
              <el-col :span="7" class="input-labal">&nbsp;</el-col>
              <el-col :span="17" class="input-box" style="text-align:left;">
                <el-button type="primary">保存</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({
  components: {}
})
export default class AddBankcard extends Vue {
  @Prop() private bankcardObj!: any;
  @Prop() private addbackcardflag!: any;
  private formModel: any = "";
    
  created() {
    console.log(this.bankcardObj);
  }

  closeAlert() {
      
  }
}
</script>

<style lang="less" scoped>
.bankcard-alert {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.55);
  .bankcard-alert-container{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 500px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,.5);
    h2{
        line-height: 58px;
        background-color: #5584fa;
        color: #fff;
        font-size: 22px;
        text-indent: 20px;
        text-align: left;
    }
    .grid-content{
        padding: 10px 20px;
    }
    .input-labal{
        line-height: 40px;
    }
    /deep/ .el-input__inner:focus{
        border-color: #5584fa;
    }
    .el-button--primary{
        background-color: #5584fa;
    }
  }
  .close-alert{
      float: right;
      display: inline-block;
      height: 58px;
      line-height: 58px;
      text-align: center;
      width: 58px;
      cursor: pointer;
  }
}
</style>

