<template lang="pug">
  div
    template(v-for="(column, index) in columns")
      .action-space-double(v-if="index === 0")
      .action-space-quadruple(v-else-if="index === 1")
      el-input(:value="column.label | truncate", :style="{ width: (column.width - 16) + 'px' }", readonly)
      .action-space-half
        j-icon-button(v-if="column.keyName === sortKeyName && sortOrder === 'desc'", genre="fas", value="sort-down", color="dark", @click="sortTasks(column.keyName)")
        j-icon-button(v-else-if="column.keyName === sortKeyName && sortOrder === 'asc'", genre="fas", value="sort-up", color="dark", @click="sortTasks(column.keyName)")
        j-icon-button(v-else, genre="fas", value="sort", @click="sortTasks(column.keyName)")
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    sortKeyName: {
      type: String,
      default: 'createdAt'
    },
    sortOrder: {
      type: String,
      default:'desc'
    }
  },
  methods: {
    sortTasks (columnKeyName) {
      this.$emit('sortTasks', columnKeyName)
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-input__inner {
    border: none;
  }
  .action-space-half {
    display: inline-block;
    width: $basespace-300;
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
