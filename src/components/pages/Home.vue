<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr(size="1", color="grey")
    el-main main
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
  .project-icon-area {
    @include m-fixed-width(48px)
    @include m-fixed-height(48px)
    background-color: black;
    border-radius: $basespace-200;
  }
  .project-icon {
    width: 100%;
    color: white;
  }
</style>
