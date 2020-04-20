<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header
          el-button.mb-300(@click="addTask", size="mini", icon="el-icon-plus") タスクを追加
          hr
        el-main
          el-table(:data="tableData",
                   :header-cell-style="{height: '32px', padding: '0'}",
                   :cell-style="{padding: '0'}",
                   border)
            el-table-column(v-for="column in columnList", :key="column.label", :label="column.label", :width="column.width")
              template(slot-scope="scope")
                el-input(v-model="scope.row[column.value]")
</template>

<script>
export default {
  data () {
    return {
      columnList: [
        { label: 'タスク名', value: 'name', width: 480 },
        { label: '担当者', value: 'person', width: 120 },
        { label: '期日', value: 'deadline', width: 120 },
        { label: 'タグ', value: 'tag', width: 120 },
        { label: 'その他', value: 'other'},
      ],
      tableData: [{
        name: 'タスクの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/16',
        tag: 'MVP',
        other: ''
      }, {
        name: 'セクションの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/17',
        tag: 'MVP',
        other: ''
      }, {
        name: 'セクションとタスクの紐付け',
        person: 'ジョニー',
        deadline: '4/20',
        tag: 'MVP',
        other: ''
      }, {
        name: 'タスク/セクションの並び替え機能',
        person: 'ジョニー',
        deadline: '4/22',
        tag: 'MVP',
        other: ''
      }]
    }
  },
  methods: {
    addTask () {
      this.tableData.push({
        name: '',
        person: '',
        deadline: '',
        tag: '',
        other: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .cell {
    padding: 0px;
  }

  ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }

  ::v-deep td:first-child  {
    .cell {
      padding: 0px;
    }
  }
</style>
