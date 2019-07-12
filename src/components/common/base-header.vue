<template>
  <div class="header">
    <div class="header-left">
      <h2>鑫鑫支付</h2>
    </div>
    <div class="header-right">
      欢迎您
      <button>退出登录</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class BaseHeader extends Vue {}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 50px;
  height: 64px;
  background-color: #5684fa;
  color: #fff;
  font-family: "PingFang SC";
  .header-left {
    font-size: 22px;
  }
  .header-right {
    font-size: 16px;
    font-family: "PingFang SC";
    button {
      border-radius: 3px;
      width: 92px;
      height: 40px;
      background-color: #e3ecf9;
      margin: 0;
      padding: 0;
      color: #5684fa;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
