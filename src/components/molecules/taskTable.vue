<template lang="pug">
  div
    draggable
      div(v-for="row in data")
        .row-area
          span.move-icon-area
            v-icon.move-icon(name="grip-vertical")
          el-input(v-for="column in columns", v-model="row[column.value]", :style="{ width: '120px' }")
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
  .row-area {
    width: 100%;
    overflow: scroll;
  }
  .move-icon-area {
    margin: $basespace-200;
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
