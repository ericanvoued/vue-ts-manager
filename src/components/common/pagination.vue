<template>
    <div class="pigination-box">
      <div class="pigination-page">
        <el-pagination
        prev-text="上一页"
        next-text="下一页"
        background
        :current-page="PiginationModule.page"
        layout="prev, pager, next"
        :total="PiginationModule.total">
      </el-pagination>
      </div>
      <div class="pigination-input-label">跳转到</div>
      <div class="pigination-input">
        <el-input v-model="goPage"
        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" 
        :max="9999999" type="number" size="mini"  placeholder="页码"></el-input>
      </div>
      <div class="pigination-button">
        <el-button @click="handleGo">Go</el-button>
      </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State,Action, Mutation} from 'vuex-class';
@Component
export default class Pigination extends Vue {
  @Action("go_page_action") private go_page_action: any;
  @State(state => state.PiginationModule) private PiginationModule!: any;
  private goPage:number = 1
  private pageSize:number = 10
  handleGo(){
    let goPage = Number(this.goPage)
    let maxPage = this.PiginationModule.total/this.pageSize
    if(goPage < 0){
      this.goPage = 0
    }
    if(goPage > maxPage){
      this.goPage = maxPage
    }
    goPage = Number(this.goPage)
    this.go_page_action(goPage)
  }
}
</script>

<style lang="less" scoped>
.pigination-box{
    height: 80px;
    margin-bottom: 10px;
    padding-right: 17px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .pigination-page{
      /deep/ .el-pagination .el-pager li.active{
        background:rgba(255,255,255,1);
        border:2px solid rgba(83, 152, 248, 1);
        color:rgba(83, 152, 248, 1);
      }
      /deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: rgba(86,132,250,1);
      }
      /deep/ .el-pager li{
        background:rgba(255,255,255,1);
        border:1px solid rgba(202,202,202,1);
        box-sizing: border-box;
        border-radius:3px;
        height: 28px;
        width: 28px;
        min-width: 28px;
        line-height: 28px;
        text-align: center;
        padding: 0;
      }
      /deep/ .btn-prev, /deep/.btn-next{
        font-size:14px;
        border:1px solid rgba(202,202,202,1);
        background:rgba(255,255,255,1);
        padding: 0 15px;
        height: 28px;
        line-height: 28px;
         &:hover{
          border:1px solid rgba(86,132,250,1);
          color: rgba(86,132,250,1);
        }
        &:disabled{
           border:1px solid #cacaca;
          color: #cacaca;
        }
        span{
          height: 26px;
          line-height: 26px;
        }
      }
      /deep/.el-pagination span{
         height: 26px;
        line-height: 26px;
      }
    }
    .pigination-input-label{
      margin-left:5px; 
      width: 50px;
      font-size:12px;
      text-align: right;
      color:rgba(102,102,102,1);
      position: relative;
      &::before{
        content: '';
        display: inline-block;
        height: 16px;
        width: 1px;
        position: absolute;
        left: 0;
        // top: -px;
        background:rgba(202,202,202,1);
      }
    }
    .pigination-input{
      width: 40px;
      margin-right: 20px;
      margin-left: 10px;
      /deep/ .el-input__inner{
        padding: 0;
        text-align: center;
        font-size: 14px;
        &:focus{
           border:1px solid rgba(86,132,250,1);
        }
      }
      /deep/ input::-webkit-outer-spin-button,
      /deep/ input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
       /deep/ input[type="number"]{
        -moz-appearance: textfield;
      }
    }
    .pigination-button{
      margin-right: 17px;
      .el-button{
        // border: 1px solid rgba(86,132,250,1);
        box-sizing: border-box;
        height: 28px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:rgba(86,132,250,1);
        border-radius:3px;
        font-size:14px;
        font-weight:400;
        padding: 0;
        color:rgba(255,254,255,1);
      }
    }
}
</style>


