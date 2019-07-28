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
      <el-form-item label="账户名称" prop="account">
        <el-input disabled v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item  label="开户行地址" prop="address">
        <el-input disabled v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="下发金额" prop="money">
        <el-input v-model.number="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立交提交</el-button>
        <el-button type="primary" @click="seeSurplus()">当前余额</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ApiList } from "../../api/api";

export default {
  name: "apply",
  data() {
    return {
      ruleForm: {
        date1: "",
        date2: "",
        card: "",
        name: "",
        account: "",
        address: "",
        money: ""
      },
      rules: {
        account: [
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
     let api = new ApiList();
     api.getcardList().then(resp=>{
        this.cards = resp.data.data;
     });
  },
  methods: {
    ...mapMutations(["remove_editableTabs"]),
    changeCard() {
      let card = this.cards.find(item=>{
          return item.cardno = this.ruleForm.card;
          });
      debugger
      this.ruleForm.name = card.bankname;
      this.ruleForm.account = card.account;
      this.ruleForm.address = card.bankaddress;
    },
    submitForm(type) {
      console.log(this.ruleForm);
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          let apiList = new ApiList();
          apiList
            .withdraw({
              card_no: this.ruleForm.card,
              cardhold: this.ruleForm.account,
              bankname: this.ruleForm.name,
              bankaddress: this.ruleForm.address,
              amount:this.ruleForm.money
            })
            .then(resp => {
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
         debugger
        this.ruleForm.money = parseInt(resp.data[0].balance);
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
</style>


