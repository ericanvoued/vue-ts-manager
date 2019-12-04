<template>
  <div class="menu">
    <el-menu
      :default-active="HomeModule.activeTabIndex"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="handleSelect"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu :index="`${index+1}`" v-for="(item,index) in menuList" :key="index">
        <template slot="title">
          <i :class="item.name+'-icon'"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-if="item.children && item.children.length>0">
          <template v-for="(child,cindex) in item.children">
            <div :key="cindex">
              <el-menu-item
                v-if="child.baserouteurl != '/home/register' && child.baserouteurl != '/home/user-list' && child.baserouteurl != '/home/fee-rate-manager'"
                :index="`${index+1}-${cindex+1}`"
              >
                <div @click="addTabList(item, child)" class="divlink">{{child.title}}</div>
              </el-menu-item>
              <el-menu-item
                v-if="(child.baserouteurl == '/home/register'|| child.baserouteurl == '/home/user-list' || child.baserouteurl == '/home/fee-rate-manager') && isAdmin()"
                :index="`${index+1}-${cindex+1}`"
              >
                <div @click="addTabList(item, child)" class="divlink">{{child.title}}</div>
              </el-menu-item>
            </div>
          </template>
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
  @Mutation("set_activeTabIndex") private set_activeTabIndex: any;
  @Mutation("set_editableTabsValue2") private set_editableTabsValue2: any;
  @Action("getTableList") private getTableList: any;
  private isCollapse: Boolean = false;
  private menuList: any = menuList;

  created() {
    this.$nextTick(() => {
      this.initForm();
    })
  }
  isAdmin() {
    let userStr: any = sessionStorage.getItem("userInfo");
    let user: any = JSON.parse(userStr);
    if (user.username.indexOf("admin") > -1) {
      return true;
    } else {
      return false;
    }
  }

  initTab() {
    if (this.$route.fullPath == "/home") {
      this.set_activeTabIndex('1-1')
      if (this.menuList[0].children) {
        this.add_editableTabs({
          ...this.menuList[0].children[0],
          url: this.menuList[0].children[0].baserouteurl
        });
      } else {
        this.add_editableTabs({
          url: this.menuList[0].children[0].baserouteurl
        });
      }
      this.$router.push(this.menuList[0].children[0].baserouteurl);
    } else {
      this.initMenu();
    }
  }

  initMenu() {
    let activeMenu: any = '';
    this.menuList.map((item: any, index: number) => {
      item.children.map((child: any, cIndex: number) => {
        if (child.baserouteurl == this.$route.fullPath) {
          activeMenu = (index +1) + "-" + (cIndex + 1);
          this.set_activeTabIndex(activeMenu)
          this.add_editableTabs({
            ...child,
            activeMenu: activeMenu,
            url: child.baserouteurl
          });
        }
      });
    });
  }

  @Watch("HomeModule.formParams")
  watchMenu(newVal: any, oldVal: any) {
    if (
      newVal != oldVal &&
      newVal.hasOwnProperty("config") &&
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
    this.initTab();
    this.HomeModule.editableTabs2.map((item: any) => {
      if (item.name == this.HomeModule.editableTabsValue2) {
        this.set_formParams(item);
      }
    });
  }
  handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }

  handleSelect(key: any, keyPath: any) {
    console.log(key, keyPath);
    let pIndex = key[0] - 1;
    let rIndex = key[2] - 1;
    if(this.menuList[pIndex].children[rIndex].baserouteurl == this.$route.fullPath) {
      return;
    }

    let tabExitFlag: boolean = false;
    this.HomeModule.editableTabs2.map((cItem: any, Cindex: number) => {
      if(cItem.baserouteurl == this.menuList[pIndex].children[rIndex].baserouteurl) {
        tabExitFlag = true;
        this.set_editableTabsValue2(cItem.name + "")
      }
    })

    if(!tabExitFlag) {
      this.set_activeTabIndex(key)
      this.add_editableTabs({
        ...this.menuList[pIndex].children[rIndex],
        activeMenu: key,
        url: this.menuList[pIndex].children[rIndex].baserouteurl
      });
    }

    this.set_formParams({
      ...this.menuList[pIndex].children[rIndex],
      url: this.menuList[pIndex].children[rIndex].baserouteurl
    });
    this.$router.push({ path: this.menuList[pIndex].children[rIndex].baserouteurl });
  }

  handleClose(key: any, keyPath: any) {
    // console.log(key, keyPath);
    
  }

  /**
   * 点击方法暂时被 handleSelect 替换
   * 2019-11-29 eric
   */
  addTabList(item: any, child: any) {
    if(child.baserouteurl == this.$route.fullPath) {
      return;
    }
    // let tabExitFlag: boolean = false;
    // this.HomeModule.editableTabs2.map((cItem: any, Cindex: number) => {
    //   if(child.title == cItem.title) {
        // this.set_editableTabsValue2(cItem.name + "")
        // tabExitFlag = true;
      // }
    // })
    // if(!tabExitFlag) {
    //   this.add_editableTabs({
    //     ...child,
    //     url: child.baserouteurl
    //   });
    // }

    // this.set_formParams({
    //   ...child,
    //   url: child.baserouteurl
    // });
    // this.$router.push({ path: child.baserouteurl });
  }
}
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  width: 200px;
  box-shadow: 0 0px 3px #d2ccc9;
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
.manage-user-icon {
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
