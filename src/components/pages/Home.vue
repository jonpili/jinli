<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header
          el-button.mb-300(@click="addTask", :disabled="existEmptyTask", size="mini", icon="el-icon-plus") タスクを追加
          el-tag.ml-100(v-if="existEmptyTask", size="mini", effect="plain") 空のタスクが存在します
          hr
        el-main
          el-table(:data="tableData",
                   :header-cell-style="{height: '32px', padding: '0'}",
                   :cell-style="{padding: '0'}",
                   border)
            el-table-column(v-for="column in columnList", :key="column.id", :label="column.label", :width="column.width")
              template(slot-scope="scope")
                el-input(v-model="scope.row[column.value]")
</template>

<script>
export default {
  data () {
    return {
      columnList: [
        { id: 1, label: 'タスク名', value: 'name', width: 480 },
        { id: 2, label: '担当者', value: 'person', width: 120 },
        { id: 3, label: '期日', value: 'deadline', width: 120 },
        { id: 4, label: 'タグ', value: 'tag', width: 120 },
        { id: 5, label: 'その他', value: 'other'},
      ],
      tableData: [{
        id: 1,
        name: 'タスクの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/16',
        tag: 'MVP',
        other: ''
      }, {
        id: 2,
        name: 'セクションの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/17',
        tag: 'MVP',
        other: ''
      }, {
        id: 3,
        name: 'セクションとタスクの紐付け',
        person: 'ジョニー',
        deadline: '4/20',
        tag: 'MVP',
        other: ''
      }, {
        id: 4,
        name: 'タスク/セクションの並び替え機能',
        person: 'ジョニー',
        deadline: '4/22',
        tag: 'MVP',
        other: ''
      }]
    }
  },
  computed: {
    existEmptyTask () {
      const lastTask = this.tableData[this.tableData.length - 1]
      return lastTask.name === ''
    }
  },
  methods: {
    addTask () {
      this.tableData.push({
        id: this.tableData.length + 1,
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
