<template>
  <div class="pass-content">
    <form class="change-pass-form">
        <h2>修改密码</h2>
      <el-col :span="24">
        <el-row>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>原密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input type="password" v-model="userPassObj.oldPass"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>修改密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input type="password" v-model="userPassObj.newPass"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>确认新密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input type="password" v-model="userPassObj.newPassConfirm"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal">&nbsp;</el-col>
                    <el-col :span="6" class="input-box"><el-button class="submit-btn" @click="changePass()" type="primary">确定修改</el-button></el-col>
                </el-row>
            </el-col>
        </el-row>
      </el-col>
    </form>
    <!-- <form class="change-pass-form">
        <h2>修改下发/代付密码</h2>
      <el-col :span="24">
        <el-row>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>原密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>新密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal"><span class="required-icon">*</span>确认新密码:</el-col>
                    <el-col :span="6" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                </el-row>
            </el-col>
            <el-col class="grid-content" :span="24" >
                <el-row class="input-row">
                    <el-col :span="4" class="input-labal">&nbsp;</el-col>
                    <el-col :span="6" class="input-box"><el-button class="submit-btn" type="primary">确定修改</el-button></el-col>
                </el-row>
            </el-col>
        </el-row>
      </el-col>
    </form> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChangePassword extends Vue {
    private formModel: any = '';
    userPassObj = {
        oldPass: '',
        newPass: '',
        newPassConfirm: ''
    }

    changePass() {
        if(this.userPassObj.oldPass.length<6) {
            this.$message.warning('原密码不正确');
        }else if(this.userPassObj.newPass.length<6) {
            this.$message.warning('新密码长度不能低于6个');
        }else if(this.userPassObj.newPass != this.userPassObj.newPassConfirm) {
            this.$message.warning('两次输入的新密码不一致');
        }else {
            let userInfo: any = JSON.parse(sessionStorage.getItem("userInfo"));

            this.$apiList.changePass('/merchant/update', {
                password: this.userPassObj.newPass,
                userid: userInfo.id
            }).then((data: any) => {
                if(data.data.code == 0) {
                    this.$message.success(data.data.data.message);
                    sessionStorage.removeItem("userInfo");
                    this.$router.push('/surface/login');
                } else {
                    this.$message.error(data.data.data.message)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.change-pass-form{
    h2{
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        text-indent: 15px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 15px;
        line-height: 40px;
    }
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    transition: all .25s;
    margin: 20px 40px 20px 20px;
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
    padding-top: 5px;
    padding-bottom: 15px;
    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,.35);
    }
    /deep/ .input-labal{
        line-height: 40px;
        text-align: right;
        padding-right: 10px;
    }
    .input-row{
        margin-bottom: 10px;
    }
}
.submit-btn{
    background-color: #5584fa;
    border-color: #5584fa;
    float: left;
}
/deep/ .el-button--primary:hover{
    filter:brightness(1.1);
    background: #5584fa;
    border-color: #5584fa
}
.pass-content{
    height: calc(~"100vh - 128px");
    background-color: #efefef;
    padding-top: 20px;
}
.required-icon{
    color: red;
}
</style>


