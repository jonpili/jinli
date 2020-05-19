<template lang="pug">
  div
    template(v-for="(column, index) in columns")
      .action-space-double(v-if="index === 0")
      .action-space-quadruple(v-else-if="index === 1")
      el-input(v-model="column.label", :style="{ width: (column.width - 32) + 'px' }", readonly)
      .action-space
        j-icon-button(v-if="column.value === sortRule && sortOrder === 'desc'", genre="fas", value="sort-down", color="dark", @click="sortTasks(column.value)")
        j-icon-button(v-else-if="column.value === sortRule && sortOrder === 'asc'", genre="fas", value="sort-up", color="dark", @click="sortTasks(column.value)")
        j-icon-button(v-else, genre="fas", value="sort", @click="sortTasks(column.value)")
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    sortRule: {
      type: String,
      default: ''
    },
    sortOrder: {
      type: String,
      default:''
    }
  },
  methods: {
    sortTasks (columnValue) {
      this.$emit('sortTasks', columnValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input__inner {
    border: none;
  }
  .action-space {
    display: inline-block;
    width: $basespace-600;
    text-align: center;
  }
  .action-space-double {
    display: inline-block;
    width: $basespace-600 * 2;
  }
  .action-space-quadruple {
    display: inline-block;
    width: $basespace-600 * 4;
}
</style>
