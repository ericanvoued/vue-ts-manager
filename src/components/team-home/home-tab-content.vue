<template>
    <div>
        <BreadNav></BreadNav>
        <HomeFormList v-if="hasConfig && HomeModule.formParams.config.formList.length>0"></HomeFormList>
        <HomeTable></HomeTable>
        <Pigination v-if="this.$route.path.indexOf('/home/data-countup')==-1"></Pigination>
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
    
    private hasConfig: any = false;
    created() {
        this.initConfig();   
    }
    initConfig() {
        this.hasConfig = this.HomeModule.formParams.hasOwnProperty("config")
    }

    
}
</script>
