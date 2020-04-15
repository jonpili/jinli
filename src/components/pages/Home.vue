<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header
          el-button(icon="el-icon-plus") タスクを追加
          hr
        el-main
          el-table(:data="tableData")
            el-table-column(prop="name", label="タスク名")
            el-table-column(prop="person", label="担当者")
            el-table-column(prop="deadline", label="期日")
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
  }
}
</script>

<style lang="scss" scoped>

</style>
