<template>
    <div>
        <el-row class="home-form-list">
            <el-col :span="21">
                <el-row>
                    <template v-for="(item, index) in HomeModule.formParams.config.formList">
                        <el-col class="grid-content" :md="8" :key="index" v-if="item.type=='text'">
                            <el-row>
                                <el-col :span="9" class="input-labal">{{item.label}}:</el-col>
                                <el-col :span="15" class="input-box"><el-input v-model="item.value"></el-input></el-col>
                            </el-row>
                        </el-col>
                        <el-col class="grid-content" :md="8" :key="index" v-if="item.type=='select'">
                            <el-row>
                                <el-col :span="9" class="input-labal">{{item.label}}:</el-col>
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
                </el-row>
            </el-col>
            <el-col :span="3">
                <el-col class="grid-content" :md="24" style="text-align: left;">
                        <el-button type="primary" @click="searchList()">查询</el-button>
                    </el-col>
            </el-col>
        </el-row>
        <div class="add-backcard" v-if="isBankCarkPage>-1">
            <el-button @click="showAddBackcard()" icon=el-icon-plus type="primary">新增银行卡</el-button>
        </div>
        <template v-if="isBankCarkPage">
            <AddBankcard :bankcardObj='bankcardObj' :addbackcardflag="addbackcardflag"></AddBankcard>
        </template>
    </div>
    
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation, Action } from 'vuex-class';
import AddBankcard from '../alert-list/add-bankcard.vue'

@Component({
    components: {
        AddBankcard
    }
})
export default class HomeFormList extends Vue {
    @State('HomeModule') private HomeModule!: any;
    @Action("getTableList") private getTableList: any;
    private isBankCarkPage: any = window.location.href.indexOf(encodeURI("下发银行卡管理"));
    // @Mutation("set_formParams") private set_formParams: any;
    private formModel: any = '';
    private startDate: any = '';
    private endDate: any = '';
    private addbackcardflag: any = false;
    private bankcardObj: any = {
        bankcardNo:'dasdas',
        bandcarkName: '',
        accountName: '',
        accountAddress: '',
    }
    created() {
        // this.initForm();
    }
    showAddBackcard() {
       this.addbackcardflag = true;
    }

    searchList(){
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
.add-backcard{
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px 5px;
    .el-button{
        background-color: #5584fa;
    }
}
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

