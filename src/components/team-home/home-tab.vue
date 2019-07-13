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
  private tabIndex: any = 2;

  created() {
    
  }
  removeTab(targetName: any) {
    this.remove_editableTabs({'targetName':targetName})
  }

  changeTab(item: any,index: any) {
    this.$router.push({path: this.HomeModule.editableTabs2[item.index].url})
  }

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
