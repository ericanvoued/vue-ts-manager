<template>
    <el-breadcrumb class="bread-nav" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ $breadKey[$route.fullPath].group }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $breadKey[$route.fullPath].title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation,Action } from 'vuex-class';

@Component({
  components: {}
})
export default class BreadNav extends Vue {
    @State(state => state.HomeModule) private HomeModule!: any;
}
</script>

<style lang="less" scoped>
.bread-nav{
    height: 40px;
    line-height: 40px;
    padding-left: 18px;
    /deep/ .el-breadcrumb__item:first-child {
        font-size: 18px;
        font-weight: 500;
        color:#333;
    }
}
</style>


