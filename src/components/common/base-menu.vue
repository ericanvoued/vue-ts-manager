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
import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation, Action } from "vuex-class";
import menuList from "../../config/menu-config";
import HomeModule from "../../store/module/home/home-module";

@Component({
  components: {}
})
export default class BaseMenu extends Vue {
  @State("HomeModule") private HomeModule!: any;
  @Mutation("add_editableTabs") private add_editableTabs: any;
  @Mutation("set_formParams") private set_formParams: any;
  @Action("getTableList") private getTableList: any;
  private isCollapse: Boolean = false;
  private menuList: any = menuList;

  created() {
    if(this.menuList[0].children) {
      this.add_editableTabs({
          ...this.menuList[0].children[0],
          url: `/home/table/1/${this.menuList[0].title}/${this.menuList[0].children[0].title}`
      });
    }else {
        this.add_editableTabs({
        url: `/home/table/1/${this.menuList[0].title}/${this.menuList[0].children[0].title}`
    });
    }
    this.initForm();
  }


  @Watch("HomeModule.formParams")
  watchMenu(newVal: any, oldVal: any) {
    console.log(newVal);
    if (
      newVal != oldVal &&
      newVal.config.formList &&
      newVal.config.formList.length
    ) {
      this.searchList();
    }
  }

  searchList() {
    let obj: any = {};
    this.HomeModule.formParams.config.formList.map((item: any, index: any) => {
      if (item.type == "select") {
        this.$set(obj, item.name, item.value.value);
      }
      if (item.type == "text") {
        this.$set(obj, item.name, item.value);
      }
      if (item.type == "date") {
        this.$set(obj, item.name[0], this.formatDate(item.value[0]));
        this.$set(obj, item.name[1], this.formatDate(item.value[1]));
      }
    });
    this.getTableList({
      url: this.HomeModule.formParams.config.apiurl,
      params: obj
    });
  }

  formatDate(date: any) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
  }

  initForm() {
    this.HomeModule.editableTabs2.map((item: any) => {
      if (item.name == this.HomeModule.editableTabsValue2) {
        this.set_formParams(item);
      }
    });
  }
  handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  addTabList(item: any, child: any) {
    console.log(child.baserouteurl)
    
    

    if(child.baserouteurl.indexOf('table') > -1) {
      this.add_editableTabs({
      // title: child.title,
        ...child,
        url: `/home/table/1/${item.title}/${child.title}`
      });
      this.set_formParams({
        ...child,
        url: `/home/table/1/${item.title}/${child.title}`
      });
        this.$router.push({ path: `/home/table/1/${item.title}/${child.title}` });
    }else {
      this.add_editableTabs({
        // title: child.title,
        ...child,
        url: child.baserouteurl
      });
      this.set_formParams({
        ...child,
        url: child.baserouteurl
      });
      this.$router.push({ path: child.baserouteurl });
    }
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
.manage-user-icon{
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background: url("../../assets/icon/manage-user-icon.svg") left top no-repeat;
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
