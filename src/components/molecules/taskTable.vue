<template lang="pug">
  el-table(:data="data",
           :header-cell-style="{height: '32px', padding: '0'}",
           :cell-style="{padding: '0'}",
           border)
    el-table-column(width="32")
      .move-icon-area
        v-icon.move-icon(@click="moveRow", name="grip-vertical")
    el-table-column(v-for="column in columns", :key="column.id", :label="column.label", :width="column.width")
      template(slot-scope="scope")
        hr.move-select-line
        el-input(v-model="scope.row[column.value]")
        hr.move-select-line
</template>

<script>
export default {
  props: {
    data: Array,
    columns: Array
  },
  methods: {
    moveRow () {
      console.log(1234567890);
    }
  }
}
</script>

<style lang="scss" scoped>
  .move-icon-area {
    padding-left: 11px;
    padding-top: 7px;
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
</style>
