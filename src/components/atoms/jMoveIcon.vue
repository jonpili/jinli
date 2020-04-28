<template lang="pug">
  span.move-icon-area
    v-icon.move-icon(name="grip-vertical")
</template>

<style lang="scss" scoped>
  .move-icon-area {
    margin: 0 $basespace-200;
    vertical-align: middle;
    opacity: 0.5;
    &:hover {
      opacity: 1.0;
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
  .move-icon {
    color: $bdcolor-dark;
  }
  ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }
</style>
