<template>
    <div style="padding-top: 50px;">
        <div class="isopen-info" v-if="openFlag">您已绑定谷歌验证码!</div>
        <div class="qrcode-wrap" v-if="!openFlag">
            <h4>1.请下载APP谷歌身份验证器GoogleAuthenticator后扫描以下二维码。</h4>
            <img :src="imgUrl" alt="">
            <p class="keycode">密钥：{{ keyCode }}</p>
        </div>
        <div class="qrcode-wrap" v-if="!openFlag">
            <h4>2.APP扫码绑定后，请备份该二维码以免丢失，然后点击确认开启。</h4>
            <el-button @click="getQrcode(1)" type="primary">确认开启</el-button>
        </div>
        <div class="qrcode-wrap danger" v-if="!openFlag">
            <h4>3.务必要保存二维码或密钥后再点击“确认开启”按钮。</h4>
        </div>
    </div>
</template>

<script>
import { ApiList } from '../../api/api';
export default {
    name: "GoogleQrcode",
    data() {
        return {
            imgUrl: '',
            keyCode: '',
            openFlag: false,
            user: JSON.parse(sessionStorage.getItem("userInfo")),
        }
    },
    created() {
        this.getQrcode(0);
    },
    methods: {
        getQrcode(flag) {
            let api = new ApiList();
            api.getQRcode(this.user.id, flag).then(data => {
                console.log(data)
                if(flag == 0) {
                    if(data.data.data.qrurl == '' || data.data.data.qrurl == null) {
                        this.openFlag = true;
                    }else {
                        this.imgUrl = data.data.data.qrurl;
                        this.keyCode = data.data.data.key;
                        this.openFlag = false;
                    }
                } else {
                    if(data.data.data.message == "ok") {
                        this.$message({
                            type: 'success',
                            message: `密钥开启成功！`
                        });
                        this.openFlag = true;
                    } else {
                        this.$message({
                            type: 'error',
                            message: `密钥开启失败，请重试！`
                        });
                        this.openFlag = false;
                    }
                    
                }
                
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .qrcode-wrap{
        text-align: left;
        text-indent: 20px;
        img{
            width: 100px;
            height: 100px;
            display: block;
            margin: 10px auto;
        }
        .keycode{
            text-align: center;
            margin-bottom: 20px;
        }
        /deep/ .el-button--primary{
            display: inline-block;
            margin: 10px 0 0 100px;
        }
    }
    .danger{
        color: red;
        line-height: 48px;
    }
    .isopen-info{
        font-size: 18px;
    }
</style>
