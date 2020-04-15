<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header
          el-button(@click="addTask", icon="el-icon-plus") タスクを追加
          hr
        el-main
          el-table(:data="tableData", :row-style="{cursor: 'pointer'}", @cell-click="enableToEdit", border)
            el-table-column(label="タスク名")
              template(slot-scope="scope")
                el-input(v-model="scope.row.name")
            el-table-column(label="担当者")
              template(slot-scope="scope")
                el-input(v-model="scope.row.person")
            el-table-column(label="期日")
              template(slot-scope="scope")
                el-input(v-model="scope.row.deadline")
</template>

<script>
export default {
  props: {
    msg: String
  },
  data () {
    return {
      tableData: [{
        name: 'AAA',
        person: 'Tom',
        deadline: '2016-05-03'
      }, {
        name: 'BBB',
        person: 'Tom',
        deadline: '2016-05-02'
      }, {
        name: 'CCC',
        person: 'Tom',
        deadline: '2016-05-04'
      }, {
        name: 'DDD',
        person: 'Tom',
        deadline: '2016-05-01'
      }]
    }
  },
  methods: {
    addTask () {
      this.tableData.push({
        name: '',
        person: '',
        deadline: ''
      })
    },
    enableToEdit (row, column, cell, event) {
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
