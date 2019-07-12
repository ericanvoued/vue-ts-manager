<template>
    <el-breadcrumb class="bread-nav" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{ $route.params.group }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.params.groupItem }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class BreadNav extends Vue {}
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


