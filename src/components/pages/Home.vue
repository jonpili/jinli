<template lang="pug">
  el-container
    el-header
      el-button(icon="el-icon-notebook-2", type="success", circle)
      span.fs-500.fw-bold.ml-500 jinli
      hr
    el-main
      el-container
        el-header.mb-600
          content-header(:sectionList="sectionList", :activeSections="activeSections", :tableData="tableData", :taskTotalNumber="taskTotalNumber")
          hr
        el-main
          el-collapse(v-model="activeSections")
            draggable
              task-table.mb-500(:data="tableData.notSectioned", :columns="columnList", @completeTask="completeTask")
              el-collapse-item(v-for="section in sectionList", :key="section.id", :title="section.label", :name="section.id", :disabled="judgeToEdit(section.id)")
                template(slot="title")
                  .pt-100
                    jMoveIcon
                  .section-title-area
                    el-input(v-model="section.label", @click.native="editSectionTitle(section.id)", @blur="editingSectionId = ''", size="medium", :class="{ 'is-editing': judgeToEdit(section.id) }")
                task-table.mt-100(:data="tableData[section.value]", :columns="columnList", :sectionValue="section.value", @completeTask="completeTask")
</template>

<script>
import draggable from 'vuedraggable'
import contentHeader from '@/components/organisms/contentHeader'
import taskTable from '@/components/molecules/taskTable'
import jMoveIcon from '@/components/atoms/jMoveIcon'

export default {
  components: {
    draggable,
    contentHeader,
    taskTable,
    jMoveIcon
  },
  data () {
    return {
      columnList: [
        { id: 1, label: 'タスク名', value: 'name', width: 240 },
        { id: 2, label: '担当者', value: 'person', width: 120 },
        { id: 3, label: '期日', value: 'deadline', width: 120 },
        { id: 4, label: 'タグ', value: 'tag', width: 120 },
        { id: 5, label: 'その他', value: 'other', width: 120 },
      ],
      sectionList: [
        { id: 1, label: '4/15~29のタスク', value: 'section1' },
        { id: 2, label: '5/04~20のタスク', value: 'section2' }
      ],
      activeSections: [1, 2],
      editingSectionId: '',
      taskTotalNumber: 6,
      tableData: {
        notSectioned: [{
            id: 1,
            name: 'JavaScriptの勉強',
            person: 'ジョニー',
            deadline: '5/24',
            tag: '個人学習',
            other: ''
        }],
        section1: [{
          id: 2,
          name: 'タスクの表示/追加/名前変更機能',
          person: 'ジョニー',
          deadline: '4/16',
          tag: 'MVP',
          other: ''
        }, {
          id: 3,
          name: 'セクションの表示/追加/名前変更機能',
          person: 'ジョニー',
          deadline: '4/17',
          tag: 'MVP',
          other: ''
        }, {
          id: 4,
          name: 'セクションとタスクの紐付け',
          person: 'ジョニー',
          deadline: '4/20',
          tag: 'MVP',
          other: ''
        }],
        section2: [{
          id: 5,
          name: 'タスクへのいいね機能',
          person: 'ジョニー',
          deadline: '5/04',
          tag: '開発目標',
          other: ''
        }, {
          id: 6,
          name: 'タスクの削除',
          person: 'ジョニー',
          deadline: '5/05',
          tag: '開発目標',
          other: ''
        }]
      }
    }
  },
  methods: {
    editSectionTitle (id) {
      this.editingSectionId = id
    },
    judgeToEdit (id) {
      return id === this.editingSectionId
    },
    completeTask (taskId, sectionValue) {
      const newSectionedTableData = this.tableData[sectionValue].filter((task) => {
        return task.id !== taskId
      })
      this.tableData[sectionValue] = newSectionedTableData
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-collapse-item__header {
    height: $basespace-500 * 2;
    font-size: $basespace-300;
  }

  ::v-deep .el-collapse-item__content {
    font-size: $basespace-300;
  }

  .section-title-area ::v-deep .el-input__inner {
    border-color: transparent;
  }

  .is-editing ::v-deep .el-input__inner {
    border-color: #409EFF;
  }
</style>
