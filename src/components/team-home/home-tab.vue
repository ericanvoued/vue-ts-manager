<template>
  <el-tabs
    class="home-tab"
    v-model="HomeModule.editableTabsValue2"
    type="card"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="(item) in HomeModule.editableTabs2"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
        <div class="tab-content">
            <BreadNav></BreadNav>
            <HomeFormList></HomeFormList>
            <HomeTable></HomeTable>
            <Pigination></Pigination>
        </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation,namespace } from 'vuex-class';
import BreadNav from '../common/bread-nav.vue';
import HomeFormList from './home-form-list.vue';
import HomeTable from './home-table.vue';
import Pigination from '../common/pagination.vue'
@Component({
  components: {
      BreadNav,
      HomeFormList,
      HomeTable,
      Pigination,
  }
})
export default class HomeTab extends Vue {
  @State(state => state) private globalState!: any;
  @State(state => state.HomeModule) private HomeModule!: any;
  @Mutation("remove_editableTabs") private remove_editableTabs: any;
  private editableTabsValue2: any = "2";
  // private editableTabs2: any = [
  //   {
  //     title: "订单列表",
  //       name: "1",
  //   },
  //   {
  //     title: "订单列表",
  //       name: "2",
  //   }
  // ];
  private tabIndex: any = 2;

  created() {
     console.log('globalState===============',this.globalState)
  }
  removeTab(targetName: any) {
    this.remove_editableTabs({'targetName':targetName})
  }

  // addTab(targetName: any) {
  //   console.log(targetName);
  //   let newTabName = ++this.tabIndex + "";
  //   this.editableTabs2.push({
  //     title: "New Tab",
  //     name: newTabName,
  //   });
  //   this.editableTabsValue2 = newTabName;
  // }
  // removeTab(targetName: any) {
  //   console.log(targetName);
  //   let tabs = this.editableTabs2;
  //   let activeName = this.editableTabsValue2;
  //   if (activeName === targetName) {
  //     tabs.forEach((tab: any, index: any) => {
  //       if (tab.name === targetName) {
  //         let nextTab = tabs[index + 1] || tabs[index - 1];
  //         if (nextTab) {
  //           activeName = nextTab.name;
  //         }
  //       }
  //     });
  //   }

  //   this.editableTabsValue2 = activeName;
  //   this.editableTabs2 = tabs.filter((tab: any) => tab.name !== targetName);
  // }
}
</script>

<style lang="less" scoped>
.home-tab {
    height: 100%;
  /deep/ .el-tabs__header {
    height: 62px;
    margin-bottom: 0;
    border-bottom: 2px solid #a5afc9 !important;
    display: flex;
    align-items: center;
  }
  /deep/ .el-tabs__header .el-tabs__item,
  /deep/ .el-tabs__header .el-tabs__nav {
    border: none !important;
  }
  /deep/ .el-tabs__item.is-active {
    background-color: #e4ebfe;
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
