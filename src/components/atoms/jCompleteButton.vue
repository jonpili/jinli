<template lang="pug">
  span.complete-button-area
    font-awesome-icon.complete-button(:icon="['far', 'check-circle']", @click="handleClick")
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .complete-button-area {
    margin: 0 $basespace-100;
    vertical-align: middle;
  }
  .complete-button {
    color: $bdcolor-dark;
    &:hover {
      color: $basecolor-success;
      cursor: pointer;
    }
  }
  ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }
</style>
