<template>
    <el-row class="home-form-list">
        <el-col :span="24">
            <el-row>
                <el-col class="grid-content" :md="8" >
                    <el-row>
                        <el-col :span="9" class="input-labal">申请平台:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" >
                    <el-row>
                        <el-col :span="9" class="input-labal">下发金额:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">银行卡号:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">账户姓名:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">开户行地址:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">下发操作人:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">下发状态:</el-col>
                        <el-col :span="15" class="input-box">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown" class="home-input-dropdown">
                                    <el-dropdown-item>黄金糕</el-dropdown-item>
                                    <el-dropdown-item>狮子头</el-dropdown-item>
                                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item>双皮奶</el-dropdown-item>
                                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8">
                    <el-row>
                        <el-col :span="9" class="input-labal">备注关键词:</el-col>
                        <el-col :span="15" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="16">
                    <el-row>
                        <el-col :span="4" class="input-labal">下发时间：</el-col>
                        <el-col :span="15" class="input-box">
                            <el-date-picker
                                v-model="startDate"
                                type="date">
                            </el-date-picker>
                            &nbsp;-&nbsp;
                            <el-date-picker
                                v-model="endDate"
                                type="date">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="4">
                    <el-button type="primary">查询</el-button>
                </el-col>
            </el-row>
        </el-col>
        <!-- <el-col :span="6">
            <el-row>
                <el-col :span="5" class="input-labal">下发时间：</el-col>
                <el-col :span="19" class="input-box">
                    <el-date-picker
                        v-model="startDate"
                        type="date">
                    </el-date-picker>
                    &nbsp;-&nbsp;
                    <el-date-picker
                        v-model="endDate"
                        type="date">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="4"><el-button type="primary">查询</el-button></el-col> -->
    </el-row>
    
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeFormList extends Vue {
    private formModel: any = '';
    private startDate: any = '';
    private endDate: any = '';
}
</script>

<style lang="less" scoped>
.home-form-list{
    padding-left: 10px;
    .grid-content{
        height: 48px;
    }
    /deep/ .el-button--primary{
        background-color: #5584fa;
    }
    .input-labal{
        font-size: 14px;
        line-height: 40px;
        text-align: right;
        padding-right: 4px;
    }
    /deep/ .el-date-editor.el-input{
        width: 45%;
    }
}
.input-box{
    height: 42px;
    /deep/ .el-dropdown{
        width: calc(~"100% - 30px");
        height: 100%;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        text-align: left;
        line-height: 40px;
        font-size: 14px;
        padding:  0 15px;
    }
    /deep/ .el-dropdown-link{
        width: 100%;
        height: 100%;
        display: inline-block;
        position: relative;
        .el-icon--right{
            position: absolute;
            right: 0;
            top: 12px;
        }
    }
}
.home-input-dropdown{
    /deep/ .el-dropdown-menu__item:not(.is-disabled):hover{
        background-color: #5584fa;
        color: #ffffff;
    }
}
</style>

