<template>
  <div>
    <HomeTab></HomeTab>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeTab from "./home-tab.vue";

@Component({
  components: {
    HomeTab
  }
})
export default class HomeAside extends Vue {}
</script>
