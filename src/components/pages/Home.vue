<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
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

</style>
