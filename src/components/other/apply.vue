<template>
  <div class="registerContent">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="applyForm"
      label-width="100px"
      class="regRuleForm"
    >
      <el-form-item label="选择时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择起始时间"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="11">
          <el-date-picker placeholder="选择结束时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="银行卡号">
        <el-select class="cardSelect" v-model="ruleForm.card" placeholder="银行卡号" @change="changeCard">
          <el-option v-for="(card,index) in cards" :label="card.cardno" :value="card.cardno" :key="'card' + index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行名称" prop="name">
        <el-input disabled v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账户名称" prop="cardhold">
        <el-input disabled v-model="ruleForm.cardhold"></el-input>
      </el-form-item>
      <el-form-item label="当前余额" prop="currentMoney">
        <p class="current-money">{{ currentcyMoney }}</p>
      </el-form-item>
      <el-form-item  label="开户行地址" prop="address">
        <el-input disabled v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="下发金额" prop="money">
        <el-input v-model.number="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <p class="rest-money" :class="{'danger': calcRestMoney == '您已超出当前余额，请修改！'}"> {{ calcRestMoney }}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="showDialog()">立即提交</el-button>
        <!-- <el-button type="primary" @click="seeSurplus()">当前余额</el-button> -->
      </el-form-item>
    </el-form>
    <el-dialog
      title="请输入谷歌验证码"
      :visible.sync="dialogVisible"
      custom-class="google-alert"
      width="30%">
      <input type="text" v-model="googleCode">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkCode()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ApiList } from "../../api/api";
import { currentcy } from "@/config/number"

export default {
  name: "apply",
  data() {
    return {
      dialogVisible: false,
      googleCode: '',
      googleKeyFlag: false,
      user: JSON.parse(sessionStorage.getItem("userInfo")),
      ruleForm: {
        date1: "",
        date2: "",
        card: "",
        name: "",
        account: "",
        cardhold: "",
        address: "",
        money: "",
        curent: ''
      },
      rules: {
        cardhold: [
          { required: true, message: "请输入账户名称", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入银行名称", trigger: "blur" }
          //   { max: 10, message: "长度在不超过 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入开户行地址", trigger: "blur" }
        ],
        card: [
          { required: true, message: "请选择银行卡号", trigger: "change" }
        ],
        money: [
          { required: true, message: "请输入下发金额", trigger: "blur" },
          { type: "number", message: "金额必须为数值",trigger: "blur" }
        ]
      },
      cards:[],
    };
  },
  created() {
    this.checkGoogleKey();
     let api = new ApiList();
     api.getcardList().then(resp=>{
        this.cards = resp.data.data;
     });
     this.seeSurplus();
  },
  computed: {
    currentcyMoney() {
      return currentcy(this.ruleForm.curent)
    },
    calcRestMoney() {
      let ret = '';
      let curent = this.ruleForm.curent == ''? 0: parseFloat(this.ruleForm.curent);
      let money = isNaN(parseFloat(this.ruleForm.money)) || this.ruleForm.money == ''? 0: parseFloat(this.ruleForm.money);
        if(curent - money < 0) {
          ret = "您已超出当前余额，请修改！"
        }else {
          
          ret = '当前可下发余额：' + currentcy(curent - money + '')
        }
        return ret;
    }
  },
  methods: {
    ...mapMutations(["remove_editableTabs"]),
    changeCard(value) {
      console.log(value)
      let card = {};
      this.cards.map(item => {
        item.cardno == value? card = item: null;
      })
      // let card = this.cards.find(item=>{
      //     return item.cardno = this.ruleForm.card;
      // });

      this.ruleForm.name = card.bankname;
      this.ruleForm.cardhold = card.cardhold;
      this.ruleForm.address = card.bankaddress;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    checkGoogleKey() {
      let api = new ApiList();
      api.getQRcode(this.user.id, 0).then(data => {
        if(data.data.data.qrurl == '' || data.data.data.qrurl == null) {
            this.googleKeyFlag = true;
        }else {
            this.googleKeyFlag = false;
        }
      })
    },
    checkCode(){
      let api = new ApiList();
      api.getQRcode(this.user.id, 0, this.googleCode).then(data => {
        if(data.data.data.message == 'fail') {
            this.$message.error("谷歌密码验证失败!");
        }else {
          this.dialogVisible = false;
          this.submitForm();
        }
      })
    },
    submitForm() {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          let apiList = new ApiList();
          apiList.withdraw({
              card_no: this.ruleForm.card,
              cardhold: this.ruleForm.cardhold,
              bankname: this.ruleForm.name,
              bankaddress: this.ruleForm.address,
              amount:this.ruleForm.money
            }).then(resp => {
              if (parseInt(resp.data.code) == 0) {
                this.$message({
                  type: "success",
                  message: '提款申请成功!'
                });
                
              } else {
                this.$message.error("提款申请失败!");
              }
            })
            .catch(error => {
              his.$message.error("提款申请失败:" + error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    seeSurplus() {
     let api = new ApiList();
     api.seeBalance().then(resp=>{
        // this.ruleForm.curent = '1323';
        // this.ruleForm.curent = resp.data[0].balance;
        this.ruleForm.money = resp.data[0].balance;
        this.ruleForm.curent = resp.data[0].balance;
     });
    }
  }
};
</script>

<style lang="less" scoped>
.registerContent {
  width: 100%;
  padding: 100px calc(50% - 100px) 0 calc(50% - 400px);
  .regRuleForm {
    width: 500px;
    .cardSelect {
        width:100%;
        // color: rgb(33,55,66);
    }
  }
}
/deep/ .el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 0;
}
/deep/ .el-button--default {
  border-radius: 0;
}
/deep/ .el-button--primary:hover,
.el-button--primary:focus {
  background-color: #66b1ff;
  border-color: #66b1ff;
}
.current-money{
  color: #999;
  text-align: left;
}
.rest-money{
  text-align: left;
  position: relative;
  top: -15px;
  &.danger {
    color: red;
  }
}

</style>
<style lang="less">
  .google-alert{
    /deep/ .el-dialog__body{
      padding: 10px 5px;
    }
    input{
      width: 85%;
      line-height: 36px;
    }
  }
</style>

