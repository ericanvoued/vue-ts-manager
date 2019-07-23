<template>
  <div class="home-table">
    <el-table :data="arr" height="100%" style="width: 100%">
      <el-table-column fixed prop="id" label="订单ID"></el-table-column>
      <el-table-column prop="listtype" label="订单类型"></el-table-column>
      <el-table-column prop="amount" label="订单金额"></el-table-column>
      <el-table-column prop="payamount" label="支付金额"></el-table-column>
      <el-table-column prop="fee" label="手续费"></el-table-column>
      <el-table-column prop="liststatus" label="保证金"></el-table-column>
      <el-table-column prop="createtime" label="虚拟金币余额"></el-table-column>
      <el-table-column prop="updatetime" label="下单时间"></el-table-column>
      <el-table-column prop="merchantno" label="商户单号"></el-table-column>
      <el-table-column prop="systemno" label="累计手续费"></el-table-column>
      <el-table-column prop="userid" label="状态"></el-table-column>
      <!-- <el-table-column prop="freeze" label="是否冻结"></el-table-column>
      <el-table-column prop="agenter" label="经纪人"></el-table-column>
      <el-table-column prop="chanelName" label="渠道名称"></el-table-column>
      <el-table-column prop="loginDate" label="最近登录时间"></el-table-column>
      <el-table-column prop="signDate" label="注册时间"></el-table-column>
      <el-table-column prop="operation" label="操作"></el-table-column> -->
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
import { tableData } from "../../mock/home-table";
import { ApiList } from '../../api/api';

@Component
export default class HomeTable extends Vue {
  private apiList = new ApiList();
  private tableData: any = tableData;
  private arr:any = []
   mounted() {
    this.depositlist();
  }
  depositlist(){
    this.apiList.depositlist({begin_time:'2019-07-10 20:00:14',end_time:'2019-07-21 20:36:56',listtype:'alipay'}).then((res:any)=>{

     this.arr = res.data.data
    })
  }
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


