<template>
  <div class="home">
    <BaseHeader></BaseHeader>
    <div class="home-main">
      <BaseMenu></BaseMenu>
      <router-view class="home-aside"/>
      <!-- <HomeAside class="home-aside"></HomeAside> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseHeader from "@/components/common/base-header.vue";
import BaseMenu from "@/components/common/base-menu.vue";
import HomeAside from "@/components/team-home/home-aside.vue";

@Component({
  components: {
    BaseHeader,
    BaseMenu,
    HomeAside
  }
})
export default class HomePage extends Vue {}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
}
.home-main {
  width: 100%;
  height: calc(~"100% - 64px");
  display: flex;
  .home-aside {
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>

