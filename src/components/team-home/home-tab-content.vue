<template>
    <div>
        <BreadNav></BreadNav>
        <HomeFormList v-if="HomeModule.formParams.config.formList.length>0"></HomeFormList>
        <HomeTable></HomeTable>
        <Pigination v-if="isStatics==-1"></Pigination>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from 'vuex-class';
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
    @State("HomeModule") private HomeModule!: any;
    private isStatics: any = window.location.href.indexOf(encodeURI('商户流量统计'));

    
}
</script>
