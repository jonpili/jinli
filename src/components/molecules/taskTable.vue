<template lang="pug">
  div
    draggable
      el-input.header(v-for="column in columns", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
      div(v-for="row in data")
        .row-area
          span.move-icon-area
            v-icon.move-icon(name="grip-vertical")
          el-input(v-for="column in columns", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    data: Array,
    columns: Array
  }
}
</script>

<style lang="scss" scoped>
  .header ::v-deep .el-input__inner {
    margin-left: 34px;
    border: none;
  }
  .row-area {
    width: 100%;
    overflow: scroll;
  }
  .move-icon-area {
    margin: 0 $basespace-200;
    vertical-align: middle;
    &:hover {
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
