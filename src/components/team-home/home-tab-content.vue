<template>
    <div>
        <BreadNav></BreadNav>
        <HomeFormList></HomeFormList>
        <HomeTable></HomeTable>
        <Pigination></Pigination>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BreadNav from '../common/bread-nav.vue';
import HomeFormList from './home-form-list.vue';
import HomeTable from './home-table.vue';
import Pigination from '../common/pagination.vue'
@Component({
  components: {
      BreadNav,
      HomeFormList,
      HomeTable,
      Pigination,
  }
})
export default class HomeTabContent extends Vue {
}
</script>
