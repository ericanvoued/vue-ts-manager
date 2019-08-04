<template>
  <el-tabs
    class="home-tab"
    v-model="HomeModule.editableTabsValue2"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="changeTab"
    
  >
    <el-tab-pane
      v-for="(item) in HomeModule.editableTabs2"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
        <div class="tab-content">
            <router-view />
        </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation,Action } from 'vuex-class';
@Component({
  components: {
  }
})
export default class HomeTab extends Vue {
  @State(state => state) private globalState!: any;
  @State(state => state.HomeModule) private HomeModule!: any;
  @Mutation("remove_editableTabs") private remove_editableTabs: any;
  @Mutation("set_formParams") private set_formParams: any;
  @Action("getTableList") private getTableList: any;
  private editableTabsValue2: any = "2";
  private tabIndex: any = 2;

  created() {
    
  }
  removeTab(targetName: any) {
    this.remove_editableTabs({'targetName':targetName})
    
  }

  @Watch('HomeModule.editableTabsValue2')
  watchEditableTabsValue2(newVal: any, oldVal: any) {
    if(newVal != oldVal) {
      this.HomeModule.editableTabs2.map((item: any) => {
        if(item.name == newVal) {
          this.set_formParams(item);
          this.$router.push({path: this.HomeModule.formParams.baserouteurl});
          if(this.HomeModule.formParams.hasOwnProperty("formParams")) {
            this.searchList();
          }
        }
      })
    }
  }

  changeTab(item: any,index: any) {
    this.set_formParams({
      ...this.HomeModule.editableTabs2[item.index]
    })
    this.$router.push({path: this.HomeModule.editableTabs2[item.index].url});
    if(this.HomeModule.formParams.hasOwnProperty("formParams")) {
      this.searchList();
    }
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

}
</script>

<style lang="less" scoped>
.home-tab {
    // height: 100%;
  /deep/ .el-tabs__header {
    height: 62px;
    margin-bottom: 0;
    border-bottom: 2px solid #a5afc9 !important;
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  /deep/ .el-tabs__header .el-tabs__item,
  /deep/ .el-tabs__header .el-tabs__nav {
    border: none !important;
  }
  /deep/ .el-tabs__item.is-active {
    background-color: #e4ebfe;
    border-radius: 3px;
    color: #333;
  }
  /deep/ .el-tabs__item:hover {
    color: #5684fa;
  }
  /deep/ .el-tabs__item {
    font-size: 18px !important;
  }
  /deep/ .el-tabs__item .el-icon-close:before {
    transform: scale(1.9);
  }
}
/deep/ .el-tabs__content{
    height: calc(~"100% - 64px");
}
/deep/ .el-tab-pane, /deep/ .tab-content{
    height: 100%;
}
</style>
