<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header
          el-button.mb-300(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus") タスクを追加
          el-select.ml-100(v-model="selectedSectionId", :disabled="existEmptyTask", placeholder="セクションを選択", clearable)
            el-option(v-for="section in sectionList", :key="section.id", :label="section.label", :value="section.id")
          el-tag.ml-100(v-if="existEmptyTask", size="mini", effect="plain") 空のタスクが存在します
          hr
        el-main
          task-table.mb-500(:data="notSectionedTableData", :columns="columnList")
          el-collapse(v-model="activeSections")
            el-collapse-item(v-for="section in sectionList", :key="section.id", :title="section.label", :name="section.id")
              task-table(:data="sectionTableData(section.id)", :columns="columnList")
</template>

<script>
import taskTable from '@/components/molecules/taskTable'

export default {
  components: {
    taskTable
  },
  data () {
    return {
      columnList: [
        { id: 1, label: 'タスク名', value: 'name', width: 480 },
        { id: 2, label: '担当者', value: 'person', width: 120 },
        { id: 3, label: '期日', value: 'deadline', width: 120 },
        { id: 4, label: 'タグ', value: 'tag', width: 120 },
        { id: 5, label: 'その他', value: 'other'},
      ],
      sectionList: [
        { id: 1, label: '4/15~29のタスク' },
        { id: 2, label: '5/04~20のタスク' }
      ],
      selectedSectionId: '',
      activeSections: [1, 2],
      tableData: [{
        id: 1,
        section: 1,
        name: 'タスクの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/16',
        tag: 'MVP',
        other: ''
      }, {
        id: 2,
        section: 1,
        name: 'セクションの表示/追加/名前変更機能',
        person: 'ジョニー',
        deadline: '4/17',
        tag: 'MVP',
        other: ''
      }, {
        id: 3,
        section: 1,
        name: 'セクションとタスクの紐付け',
        person: 'ジョニー',
        deadline: '4/20',
        tag: 'MVP',
        other: ''
      }, {
        id: 4,
        section: 2,
        name: 'タスクへのいいね機能',
        person: 'ジョニー',
        deadline: '5/04',
        tag: '開発目標',
        other: ''
      }, {
        id: 5,
        section: 2,
        name: 'タスクの削除',
        person: 'ジョニー',
        deadline: '5/05',
        tag: '開発目標',
        other: ''
      }]
    }
  },
  computed: {
    existEmptyTask () {
      const lastTask = this.tableData[this.tableData.length - 1]
      return lastTask.name === ''
    },
    notSectionedTableData () {
      return this.tableData.filter(row => {
        return row.section === ''
      })
    }
  },
  methods: {
    addTask () {
      this.tableData.push({
        id: this.tableData.length + 1,
        section: this.selectedSectionId,
        name: '',
        person: '',
        deadline: '',
        tag: '',
        other: ''
      })
      this.selectedSectionId = ''
    },
    sectionTableData (sectionId) {
      return this.tableData.filter(row => {
        return row.section === sectionId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .cell {
    padding: 0px;
  }

  .el-table ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }

  ::v-deep td:first-child  {
    .cell {
      padding: 0px;
    }
  }
</style>
