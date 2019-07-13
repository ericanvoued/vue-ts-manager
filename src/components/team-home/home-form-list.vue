<template>
    <el-row class="home-form-list">
        <el-col :span="14">
            <el-row>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">申请平台:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">下发金额:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">银行卡号:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">账户姓名:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
            <!-- </el-row>
            <el-row> -->
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">开户行地址:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">下发操作人:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">下发状态:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
                <el-col class="grid-content" :md="8" :lg="6">
                    <el-row>
                        <el-col :span="10" class="input-labal">备注关键词:</el-col>
                        <el-col :span="14" class="input-box"><el-input v-model="formModel"></el-input></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="4"><el-button type="primary">查询</el-button></el-col>
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
</style>

