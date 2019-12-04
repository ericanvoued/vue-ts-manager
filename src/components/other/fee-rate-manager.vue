<template>
  <div class="registerContent">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="applyForm"
      label-width="100px"
      class="regRuleForm"
    >
      <el-form-item label="商户名称：" style="width: 500px;">
        <el-select
          class="cardSelect"
          v-model="ruleForm.card"
          placeholder="商户名称"
          @change="changeCard"
        >
          <el-option
            v-for="(card, index) in cards"
            :label="card.username"
            :value="card.username"
            :key="'card' + index"
          ></el-option>
        </el-select>
      </el-form-item>
      <template v-if="feeRate.length > 0">
          <div class="form-wrap" v-for="(item, index) in feeRate" :key="index" style="display: flex;width: 800px">
            <el-form-item :label="item.gatewayname" style="width: 60%;margin-right: 20px;">
              <el-input type="number" v-model.number="item.fee"></el-input>
            </el-form-item>
            <div class="right">
              <el-button size="small" @click="changeFee(item)" type="primary">修改费率</el-button>
              <el-button size="small" @click="deleteFee(item)" type="danger">删除费率</el-button>
            </div>
          </div>
          
      </template>

      <el-form-item>
        <el-button style="position: relative;left: -320px;" type="primary" @click="submitForm()">保存商户费率</el-button>
        <!-- <el-button type="primary" @click="seeSurplus()">当前余额</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ApiList } from "../../api/api";
import { currentcy } from "@/config/number";

export default {
  name: "FeeRateManager",
  data() {
    return {
      ruleForm: {
        card: "",
        cardhold: "",
        feeRate: []
      },
      currentUser: {},
      rules: {},
      cards: [],
      feeRate: []
    };
  },
  created() {
    let api = new ApiList();
    api.getAdminList().then(resp => {
      this.cards = resp.data.data;
    });
  },
  methods: {
    ...mapMutations(["remove_editableTabs"]),
    changeFee(item) {
      let api = new ApiList();
      api.changeFee(item).then(resp => {
          if (parseInt(resp.data.code) == 0) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
          } else {
            this.$message.error(resp.data.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("提交失败");
        });
    },
    deleteFee(item) {
      let api = new ApiList();
      api.deleteFee(item).then(resp => {
          console.log(resp);
          if (parseInt(resp.data.code) == 0) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            item.fee = null;
          } else {
            this.$message.error(resp.data.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("提交失败");
        });
    },
    changeCard(value) {
      let api = new ApiList();
      let user = {};
      this.cards.map(item => {
        item.username == value ? (user = item) : null;
      });
      // let userInfo = sessionStorage.getItem("userInfo");
      //   let params = {
      //     userId: JSON.parse(userInfo).id
      //   }
      api.searchFeeRate({userId: user.id}).then(data => {
        this.feeRate = data.data.data;
        this.feeRate.map(item => {
          item.userid = user.id;
        });
      });
      this.currentUser = user;
    },
    submitForm(type) {
      if (this.feeRate.length == 0) {
        this.$message.error("请选择商户!");
        return;
      }
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          let apiList = new ApiList();
          apiList
            .feeAdd({ data: this.feeRate })
            .then(resp => {
              console.log(resp);
              if (parseInt(resp.data.code) == 0) {
                this.$message({
                  type: "success",
                  message: resp.data.data.message
                });
              } else {
                this.$message.error(resp.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
              this.$message.error("提交失败");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    seeSurplus() {
      let api = new ApiList();
      api.seeBalance().then(resp => {
        // this.ruleForm.curent = '1323';
        // this.ruleForm.curent = resp.data[0].balance;
        this.ruleForm.money = resp.data[0].balance;
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
    // width: 500px;
    .cardSelect {
      width: 100%;
      // color: rgb(33,55,66);
    }
  }
}
/deep/ .el-form-item__label {
  width: 160px !important;
}
/deep/ .el-form-item__content {
  margin-left: 160px !important;
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
.current-money {
  color: #999;
  text-align: left;
}
.rest-money {
  text-align: left;
  position: relative;
  top: -15px;
  &.danger {
    color: red;
  }
}
</style>
