<template>
    <el-row class="home-form-list">
        <el-col :span="24">
            <el-row>
                <template v-for="(item, index) in HomeModule.formParams.config.formList">
                    <el-col class="grid-content" :md="8" :key="index" v-if="item.type=='text'">
                        <el-row>
                            <el-col :span="9" class="input-labal">申请平台:</el-col>
                            <el-col :span="15" class="input-box"><el-input v-model="item.value"></el-input></el-col>
                        </el-row>
                    </el-col>
                    <el-col class="grid-content" :md="8" :key="index" v-if="item.type=='select'">
                        <el-row>
                            <el-col :span="9" class="input-labal">下发状态:</el-col>
                            <el-col :span="15" class="input-box">
                                <el-dropdown trigger="click" @command="item.changeEvent($event, item)">
                                    <span class="el-dropdown-link">
                                        {{item.value.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown" class="home-input-dropdown">
                                        <el-dropdown-item :command="child" v-for="(child, cindex) in item.option" :key="cindex">{{child.label}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="grid-content" :md="16" :key="index" v-if="item.type=='date'">
                        <el-row>
                            <el-col :span="4" class="input-labal" style="position: relative;right:-3%;">{{ item.label }}：</el-col>
                            <el-col :span="17" class="input-box">
                                <el-date-picker
                                    v-model="item.value[0]"
                                    @change='item.startDateChange($event, item.value[0])'
                                    type="date">
                                </el-date-picker>
                                &nbsp;-&nbsp;
                                <el-date-picker
                                    v-model="item.value[1]"
                                    @change='item.endDateChange($event, item.value[1])'
                                    type="date">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-col>
                </template>
                    
                    <el-col class="grid-content" :md="4" style="text-align: left;">
                        <el-button type="primary">查询</el-button>
                    </el-col>
                </el-row>
            </el-col>
    </el-row>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from 'vuex-class';

@Component
export default class HomeFormList extends Vue {
    @State('HomeModule') private HomeModule!: any;
    // @Mutation("set_formParams") private set_formParams: any;
    private formModel: any = '';
    private startDate: any = '';
    private endDate: any = '';
    // private formList: any = null;
    created() {
        // this.initForm();
    }

    // initForm() {
    //     this.HomeModule.editableTabs2.map((item: any) => {
    //         if(item.name == this.HomeModule.editableTabsValue2) {
    //             this.set_formParams()
    //         }
    //     })
    // }
}
</script>

<style lang="less" scoped>
.home-form-list{
    padding-left: 10px;
    padding-right: 80px;
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

