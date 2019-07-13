<template>
  <div class="home-table">
    <el-table :data="tableData" height="100%" style="width: 100%">
      <el-table-column fixed prop="username" label="用户名"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="hisIn" label="历史入金"></el-table-column>
      <el-table-column prop="hisOut" label="历史出金"></el-table-column>
      <el-table-column prop="accountMoney" label="账户余额"></el-table-column>
      <el-table-column prop="confirmMoney" label="保证金"></el-table-column>
      <el-table-column prop="visualCoin" label="虚拟金币余额"></el-table-column>
      <el-table-column prop="balance" label="盈利亏损"></el-table-column>
      <el-table-column prop="luckyMoney" label="红包余额"></el-table-column>
      <el-table-column prop="countHands" label="累计手续费"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="freeze" label="是否冻结"></el-table-column>
      <el-table-column prop="agenter" label="经纪人"></el-table-column>
      <el-table-column prop="chanelName" label="渠道名称"></el-table-column>
      <el-table-column prop="loginDate" label="最近登录时间"></el-table-column>
      <el-table-column prop="signDate" label="注册时间"></el-table-column>
      <el-table-column prop="operation" label="操作"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
            <el-dropdown trigger="hover" class="table-dropdown">
                <span class="el-dropdown-link">
                    详情<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu class="table-dropdown-menu" slot="dropdown">
                    <el-dropdown-item @click="showDetail(scope.row)">详情</el-dropdown-item>
                    <el-dropdown-item @click="forbidden(scope.row)">禁用</el-dropdown-item>
                    <el-dropdown-item @click="freezeUser(scope.row)">冻结</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { tableData } from "@/mock/home-table";

@Component
export default class HomeTable extends Vue {
  private tableData: any = tableData;
}
</script>

<style lang="less" scoped>
.home-table {
  height: calc(~"100vh - 246px");
  width: calc(~"100% - 40px");
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  margin: 20px 20px 0;
  border-radius: 5px;
  overflow: scroll;
}
/deep/ .el-table__row {
  height: 42px;
  td {
    padding: 0;
    line-height: 42px;
    height: 42px;
    text-align: center;
  }
  th {
  }
}
/deep/ .el-table th {
  font-weight: bold;
  // padding: 5px 10px;
  width: max-content;
  text-align: center;
}
.table-dropdown{
    /deep/ .el-dropdown-selfdefine{
        color: #5584fa;
    }
    
}
.table-dropdown-menu /deep/ .el-dropdown-menu__item{
        color: #5584fa;
    }
 .table-dropdown-menu /deep/ .el-dropdown-menu__item:not(.is-disabled):hover{
     color: #fff;
     background-color: #ef6508;
    }
</style>


