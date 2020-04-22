<template lang="pug">
  //- el-table(:data="data",
  //-          :header-cell-style="{height: '32px', padding: '0'}",
  //-          :cell-style="{padding: '0'}",
  //-          border)
  //-   el-table-column(width="32")
  //-     .move-icon-area
  //-       v-icon.move-icon(name="grip-vertical")
  //-   el-table-column(v-for="column in columns", :key="column.id", :label="column.label", :width="column.width")
  //-     template(slot-scope="scope")
  //-       hr.move-select-line
  //-       el-input(v-model="scope.row[column.value]")
  //-       hr.move-select-line
  div
    draggable
      div(v-for="row in data")
        span.move-icon-area
          v-icon.move-icon(name="grip-vertical")
        el-input.cell(v-for="column in columns", v-model="row[column.value]")
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
  .move-icon-area {
    margin: 12px;
    opacity: 0;
    &:hover {
      opacity: 1;
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
  .move-icon {
    color: $bdcolor-dark;
  }
  .move-select-line {
    height: 1px;
    background-color: $bdcolor-dark;
    margin: 0px;
  }
  .cell {
    width: 96px;
  }
</style>
