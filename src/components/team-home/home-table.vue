<template>
  <div class="home-table">
    <el-table :data="HomeModule.tableList" height="100%" style="width: 100%">
      <el-table-column 
        v-for="(item, index) of HomeModule.formParams.keyMap" 
        :key="index" 
        :fixed='index==0' 
        :prop="index" 
        :label="item"
      ></el-table-column>
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
import { State, Mutation, Action } from 'vuex-class';
import { tableData } from "../../mock/home-table";
// import { ApiList } from '../../api/api';

@Component
export default class HomeTable extends Vue {
  @State("HomeModule") private HomeModule!: any;
  @Action("getTableList") private getTableList: any;
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


