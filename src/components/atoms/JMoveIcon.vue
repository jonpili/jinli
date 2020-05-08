<template lang="pug">
  span.move-icon-area
    font-awesome-icon.move-icon(:icon="['fas', 'grip-vertical']")
</template>

<style lang="scss" scoped>
  .move-icon-area {
    margin: 0 $basespace-200;
    vertical-align: middle;
    opacity: 0.3;
    &:hover {
      opacity: 1.0;
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
  .move-icon {
    color: $textcolor-light;
  }
  ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }
</style>
