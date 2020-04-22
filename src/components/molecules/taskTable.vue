<template lang="pug">
  el-table(:data="data",
           :header-cell-style="{height: '32px', padding: '0'}",
           :cell-style="{padding: '0'}",
           border)
    el-table-column(v-for="column in columns", :key="column.id", :label="column.label", :width="column.width")
      template(slot-scope="scope")
        el-input(v-model="scope.row[column.value]")
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>
