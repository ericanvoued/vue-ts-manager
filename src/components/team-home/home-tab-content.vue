<template>
    <div>
        <BreadNav></BreadNav>
        <HomeFormList v-if="hasConfig && HomeModule.formParams.config.formList.length > 0"></HomeFormList>
        <el-button 
            v-if="downloadFlag" 
            :md="12" 
            type="success" 
            @click="createdDownload(downloadUrl)"
            class="down-btn">
            <!-- <a target="_top" :href="downloadUrl" style="color: #fff;text-decoration: none;"> -->
                导出
                <i class="el-icon-download el-icon--right"></i>
            <!-- </a> -->
            
        </el-button>
        <HomeTable></HomeTable>
        <Pigination v-if="this.$route.path.indexOf('/home/data-countup') == -1" ></Pigination>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import BreadNav from "../common/bread-nav.vue";
import HomeFormList from "./home-form-list.vue";
import HomeTable from "./home-table.vue";
import Pigination from "../common/pagination.vue";
import { ApiList } from '../../api/api';

@Component({
    components: {
        BreadNav,
        HomeFormList,
        HomeTable,
        Pigination
    }
})
export default class HomeTabContent extends Vue {
    @State("HomeModule") private HomeModule!: any;
    @State(state => state.HomeModule.formParams.keyMap.optConfig.downloadFlag)
    private downloadFlag!: any;
    @State(state => state.HomeModule.formParams.keyMap.optConfig.downApiUrl)
    private downApiUrl!: any;

    private hasConfig: any = false;
    private baseUrl: string = window.location.origin;
    private downloadUrl: string = '';
    private user: any = JSON.parse(<any>sessionStorage.getItem("userInfo"));

    created() {
        this.downloadUrl = this.downApiUrl + '';
        this.initConfig();
        this.initDownloadEcel();
    }

    @Watch("HomeModule.formParams.config.formList", {deep: true})
    watchFormList(newVal: any, oldVal: any) {
         this.downloadUrl = this.downApiUrl + '';
        this.initDownloadEcel();
    }

    initConfig() {
        this.hasConfig = this.HomeModule.formParams.hasOwnProperty("config");
    }

    //下载导出
    initDownloadEcel() {
        
        let obj: any = {};
        this.$set(obj, "userid", this.user.id);
        let url: string = this.downloadUrl;
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
        
        Object.keys(obj).map((item: any) => {
            this.downloadUrl += item + "=" + obj[item] + "&";
        });

        this.downloadUrl = this.downloadUrl.slice(0, this.downloadUrl.length - 1);

    }

    createdDownload(href: any) {
        let api: any = new ApiList();
        api.getblobData(href).then((data: any) => {
            console.log(data.data,new Blob([data.data]))
            
            let url: any = window.URL.createObjectURL(
                new Blob([data.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                })
            );

            window.open(url)

            // var a = document.createElement('a');
            // a.setAttribute('href', data.data);
            // a.setAttribute('id', 'startTelMedicine');
            // // 防止反复添加
            // if(document.getElementById('startTelMedicine')) {
            //     document.body.removeChild((<any>document.getElementById('startTelMedicine')));
            // }
            // document.body.appendChild(a);
            // a.click();

        })

        // window.open(href)
        // var a = document.createElement('a');
        // a.setAttribute('href', href);
        // a.setAttribute('id', 'startTelMedicine');
        // // 防止反复添加
        // if(document.getElementById('startTelMedicine')) {
        //     document.body.removeChild((<any>document.getElementById('startTelMedicine')));
        // }
        // document.body.appendChild(a);
        // a.click();
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
}
</script>

<style lang="less" scoped>
.down-btn {
  margin-right: 34px;
  margin-bottom: 20px;
  float: right;
}
</style>
