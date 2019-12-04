<template>
  <div class="registerContent">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="regRuleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <!-- <el-form-item label="启用谷歌验证" prop="isCheck">
        <el-radio-group v-model="ruleForm.isCheck">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" @click="submitForm('submit')">立即提交</el-button>
        <el-button @click="submitForm('back')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ApiList } from "../../api/api";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        account: "",
        email: "",
        phone: "",
        isCheck: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在不超过 10 个字符",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 10, message: "长度在不超过 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^1[2345789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["remove_editableTabs"]),
    submitForm(type) {
      console.log(this.ruleForm);
      if (type == "back") {
        this.remove_editableTabs({
          targetName: this.$store.state.HomeModule.tabIndex + ""
        });
        //   console.log(this.$store.state.HomeModule.editableTabs2)
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let apiList = new ApiList();
          apiList.register({
              username: this.ruleForm.name,
              account: this.ruleForm.account,
              mail: this.ruleForm.email,
              phone: this.ruleForm.phone
            })
            .then(resp => {
              if (parseInt(resp.data.code) == 0) {
                this.$message({
                  type: "success",
                  message: '"注册成功"'
                });
                this.remove_editableTabs({
                  targetName: this.$store.state.HomeModule.tabIndex + ""
                });
              } else {
                this.$message.error("注册失败");
              }
            })
            .catch(error => {
              his.$message.error("注册失败:" + error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.registerContent {
  width: 100%;
  padding: 100px calc(50% - 100px) 0 calc(50% - 300px);
  .regRuleForm {
    width: 400px;
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


