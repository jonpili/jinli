<template lang="pug">
  span.done-button-area
    font-awesome-icon.done-button(:icon="['far', 'check-circle']")
</template>

<style lang="scss" scoped>
  .done-button-area {
    margin: 0 $basespace-100;
    vertical-align: middle;
  }
  .done-button {
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
