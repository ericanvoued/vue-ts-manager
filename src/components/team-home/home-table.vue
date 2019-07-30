<template>
  <div class="home-table">
    <el-table 
      v-loading="HomeModule.loading" 
      :data="HomeModule.tableList" 
      height="100%" 
      element-loading-customClass='table-loading'
      element-loading-text="数据加载中"
      style="width: 100%">
          <template v-for="(item, index) of HomeModule.formParams.keyMap">
            <el-table-column 
              v-if="index != 'optConfig'"
              :key="index"
              :fixed='index==0'  
              :prop="index" 
              :label="item"
            ></el-table-column>
          </template>
          <el-table-column v-if="HomeModule.formParams.keyMap.optConfig.show" label="操作" width="100">
            <template slot-scope="scope">
                <el-dropdown trigger="hover" class="table-dropdown">
                    <span class="el-dropdown-link">
                        {{HomeModule.formParams.keyMap.optConfig.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu class="table-dropdown-menu" slot="dropdown">
                        <el-dropdown-item 
                          v-for="(child, cindex) in HomeModule.formParams.keyMap.optConfig.optList" 
                          :key="cindex"
                          @click.native='optEvent(child, scope.$index, scope.row)'
                          :command='child'
                        >{{child.label}}</el-dropdown-item>
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

  private isStatics: any = window.location.href.indexOf('/home/data-countup');
  

  optEvent(item: any, a: any, b: any) {
    this.$confirm(`是否执行${item.label}操作`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj: any = {}
          this.$set(obj, item.name, b.cardno)
          this.$apiList.handleTableData(item.apiUrl, obj).then((data: any) => {
            if(data.data.code == 0) {
              this.$message.success(data.data.data.message);
              this.searchList();
            }else {
              this.$message.success(data.data.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    
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
.home-table {
  height: calc(~"100vh - 246px");
  width: calc(~"100% - 70px");
  text-align: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  margin: 20px 20px 0;
  border-radius: 5px;
  overflow: scroll;
  padding: 0 15px;
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
    /deep/ .el-loading-spinner{
      p.el-loading-text{
        color: #5584fa;
      }
      .circular .path{
        stroke: #5584fa;
      }
      
    }
    /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td{
      background-color: #cad8fc;
    }
    /deep/ .el-table td{
      border-bottom: none;
    }
    /deep/ .el-table__row:nth-child(2n-1) td{
      background-color: #f9f9f9;
    }
</style>


