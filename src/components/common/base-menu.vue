<template>
  <div class="menu">
    <el-menu
      default-active="1-4-1"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu :index="`${index+1}`" v-for="(item,index) in menuList" :key="index">
        <template slot="title">
          <i :class="item.name+'-icon'"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-if="item.children && item.children.length>0">
          <el-menu-item
            v-for="(child,cindex) in item.children"
            :key="cindex"
            :index="`${index+1}-${cindex+1}`"
          >
            <div @click="addTabList(item, child)" class="divlink">{{child.title}}</div>
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import menuList from '../../config/menu-config'

@Component({
  components: {}
})
export default class BaseMenu extends Vue {
  @State('HomeModule') private HomeModule!: any;
  @Mutation("add_editableTabs") private add_editableTabs: any;
  // @Mutation("set_editableTabs2") private set_editableTabs2: any;
  @Mutation("set_formParams") private set_formParams: any;
  private isCollapse: Boolean = false;
  private menuList: any = menuList;

  created() {
    this.add_editableTabs({
      ...this.menuList[0].children[0],
      url: `/home/table/1/${this.menuList[0].title}/${this.menuList[0].children[0].title}`
    })
    this.initForm();
  }
  initForm() {
      this.HomeModule.editableTabs2.map((item: any) => {
          if(item.name == this.HomeModule.editableTabsValue2) {
              this.set_formParams(item)
          }
      })
    }
  handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  addTabList(item: any, child: any) {
    this.add_editableTabs({
      // title: child.title,
      ...child,
      url: `/home/table/1/${item.title}/${child.title}`
    });
    this.$router.push({ path: `/home/table/1/${item.title}/${child.title}` });
  }
}
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  width: 200px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
/deep/ .el-menu {
  border: none;
  text-align: left;
}
.order-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background: url("../../assets/icon/order-icon.png") left top no-repeat;
}
.info-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background: url("../../assets/icon/info-icon.png") left top no-repeat;
}
.list-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background: url("../../assets/icon/list-icon.png") left top no-repeat;
}
.dispatch-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background: url("../../assets/icon/dispatch-icon.png") left top no-repeat;
}
/deep/ .el-menu-item.is-active,
/deep/ .el-menu-item:hover,
/deep/ .el-menu-item:focus {
  color: #5684fa;
  background-color: #e3ecf9;
}
/deep/ .el-submenu__title,
/deep/ .el-menu-item {
  font-size: 16px;
}
/deep/ .el-submenu.is-opened .el-submenu__title {
  color: #5684fa;
}
.divlink {
  width: 100%;
  height: 100%;
}
</style>
