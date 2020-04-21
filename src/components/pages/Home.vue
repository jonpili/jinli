<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header.mb-600
          .mb-100
            el-button(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus", size="mini") タスクを追加
            el-select.ml-100(v-model="selectedSectionId", :disabled="existEmptyTask", placeholder="セクションを選択", size="mini", clearable)
              el-option(v-for="section in sectionList", :key="section.id", :label="section.label", :value="section.id")
            el-tag.ml-100(v-if="existEmptyTask", size="small", type="danger", effect="plain") 空のタスクが存在します
          .mb-500
            el-button(@click="addSection", icon="el-icon-plus", size="mini") セクションを追加
          hr
        el-main
          task-table.mb-500(:data="notSectionedTableData", :columns="columnList")
          el-collapse(v-model="activeSections")
            el-collapse-item(v-for="section in sectionList", :key="section.id", :title="section.label", :name="section.id", :disabled="judgeToEdit(section.id)")
              template(slot="title")
                .section-title-area
                  el-input(v-model="section.label", @click.native="editSectionTitle(section.id)", @blur="editingSectionId = ''", size="mini", :class="{ isEditing: judgeToEdit(section.id) }")
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
      editingSectionId: '',
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
    addSection () {
      const sectionNumber = this.sectionList.length + 1
      this.sectionList.push({
        id: sectionNumber,
        label: 'セクション' + sectionNumber
      })
    },
    sectionTableData (sectionId) {
      return this.tableData.filter(row => {
        return row.section === sectionId
      })
    },
    editSectionTitle (id) {
      this.editingSectionId = id
    },
    judgeToEdit (id) {
      return id === this.editingSectionId
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .cell {
    padding: 0px;
  }

  ::v-deep .el-collapse-item__header {
    height: $basespace-600;
  }

  .section-title-area ::v-deep .el-input__inner {
    border-color: transparent;
  }

  .isEditing ::v-deep .el-input__inner {
    border-color: #409EFF;
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
