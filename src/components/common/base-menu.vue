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
          ><router-link class="divlink" tag="div" :to="`/home/table/1/${item.title}/${child.title}`">{{child.title}}</router-link></el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class BaseMenu extends Vue {
  private isCollapse: Boolean = false;
  private menuList: any = [
    {
      title: "订单管理",
      name: "order",
      children: [
        {
          title: "订单列表",
          name: "order-list"
        },
        {
          title: "订单历史",
          name: "order-history"
        },
        {
          title: "帐变列表",
          name: "order-change"
        }
      ]
    },
    {
      title: "下发管理",
      name: "dispatch",
      children: [
        {
          title: "下发列表",
          name: "dispatch-list"
        },
        {
          title: "下发历史",
          name: "dispatch-history"
        }
      ]
    },
    {
      title: "公告管理",
      name: "info",
      children: [
        {
          title: "下发列表",
          name: "dispatch-list"
        },
        {
          title: "下发历史",
          name: "dispatch-history"
        }
      ]
    },
    {
      title: "公告列表",
      name: "list",
      children: [
        {
          title: "下发列表",
          name: "dispatch-list"
        },
        {
          title: "下发历史",
          name: "dispatch-history"
        }
      ]
    }
  ];
  handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
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
.divlink{
    width: 100%;
    height: 100%;
}
</style>
