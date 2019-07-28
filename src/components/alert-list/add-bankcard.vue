<template>
  <div class="bankcard-alert" v-if="HomeModule.addbackcardflag">
    <div class="bankcard-alert-container clearfix">
      <h2>
        新增下发银行卡信息
        <span @click="closeAlert()" class="close-alert el-icon-close"></span>
      </h2>
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
                <el-button type="primary" @click="saveBankCark()">保存</el-button>
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
import { State, Mutation, Action } from "vuex-class";

@Component({
  components: {}
})
export default class AddBankcard extends Vue {
  @State("HomeModule") private HomeModule: any;
  @Mutation("set_addbackcardflag") private set_addbackcardflag: any;
    @Action("getTableList") private getTableList: any;
  private bankcardObj: any = {
    bankcardNo: "",
    bandcarkName: "",
    accountName: "",
    accountAddress: ""
  };
  private formModel: any = "";

  created() {
    console.log(this.bankcardObj);
  }

  closeAlert() {
    this.set_addbackcardflag(false);
  }

  saveBankCark() {
      let bankcardPattern = /^([1-9]{1})(\d{15}|\d{18})$/;
      if(!bankcardPattern.test(this.bankcardObj.bankcardNo.replace(/\s+/g, ''))) {
          this.$message.error('请输入正确的银行卡号');
      }else if(this.bankcardObj.bandcarkName.length == 0) {
          this.$message.error('请输入正确的银行名称');
      }else if(this.bankcardObj.accountName.length == 0) {
          this.$message.error('请输入正确的账户名称');
      }else if(this.bankcardObj.accountAddress.length == 0) {
          this.$message.error('请输入正确的开户行地址');
      }else {
          this.$apiList.addBankCark(this.bankcardObj).then((data: any) => {
              console.log(data)
              this.$message.success(data.data.data.message)
              this.set_addbackcardflag(false);
              let obj: any = {};
                this.HomeModule.formParams.config.formList.map((item: any, index: any) => {
                    if(item.type == 'select') {
                        this.$set(obj, item.name, item.value.value)
                    }
                    if(item.type == 'text') {
                        this.$set(obj, item.name, item.value)
                    }
                    if(item.type == 'date') {
                        this.$set(obj, item.name[0], this.formatDate(item.value[0]))
                        this.$set(obj, item.name[1], this.formatDate(item.value[1]))
                    }
                })
                this.getTableList({url: this.HomeModule.formParams.config.apiurl,params: obj});
          })
      }
  
  }

  formatDate(date: any){
        date = new Date(date);
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        m = m<10?("0"+m):m;
        d = d<10?("0"+d):d;
        return y+"-"+m+"-"+d;
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
  .bankcard-alert-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 500px;
    height: 375px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    h2 {
      line-height: 58px;
      background-color: #5584fa;
      color: #fff;
      font-size: 22px;
      text-indent: 20px;
      text-align: left;
    }
    .grid-content {
      padding: 10px 20px;
    }
    .input-labal {
      line-height: 40px;
    }
    /deep/ .el-input__inner:focus {
      border-color: #5584fa;
    }
    .el-button--primary {
      background-color: #5584fa;
    }
  }
  .close-alert {
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

