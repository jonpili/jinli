<template lang="pug">
  el-container
    el-header(height="75px")
      img(src="@/assets/logo.png")
    hr
    el-main
      el-container
        el-header(height="28px")
          content-header(:sections="filterSections(sections)",
                         :tableData="tableData",
                         :taskTotalNumber="taskTotalNumber",
                         :columns="visibleColumns",
                         @addTask="addTask",
                         @addSection="addSection",
                         @addField="addField",
                         @deleteField="deleteField")
        el-main
          el-collapse(v-model="activeSections")
            j-table-header.ml-600(:columns="visibleColumns", @sortTasks="sortTasks")
            draggable
              .not-sectioned-item
                task-table.mb-500(:tasks="filterTasks(tableData.notSectioned)",
                                  :columns="visibleColumns",
                                  :sortRule="sortRule",
                                  :sortOrder="sortOrder",
                                  @completeTask="completeTask",
                                  @switchLiked="switchLiked",
                                  @openTaskDetailModal="openTaskDetailModal")
                hr
              el-collapse-item.mb-500(v-for="section in filterSections(sections)",
                                     :key="section.id",
                                     :title="section.label",
                                     :name="section.id",
                                     :disabled="judgeToEdit(section.id)")
                template(slot="title")
                  j-icon-button(genre="fas", value="grip-vertical", type="grab")
                  .section-title-area.ml-200
                    el-input(v-model="section.label",
                             @click.native="editSectionTitle(section.id)",
                             @blur="editingSectionId = ''",
                             size="medium",
                             :class="{ 'is-editing': judgeToEdit(section.id) }")
                  j-icon-button.ml-200(genre="far", value="trash-alt", @click.stop="deleteSection(section)")
                task-table.mt-100(:tasks="filterTasks(tableData[section.value])",
                                  :columns="visibleColumns",
                                  :sortRule="sortRule",
                                  :sortOrder="sortOrder",
                                  @completeTask="completeTask",
                                  @switchLiked="switchLiked",
                                  @openTaskDetailModal="openTaskDetailModal")
      transition(name="task-detail-modal")
        .task-detail-modal-area(v-if="showTaskDetailModal")
          task-detail-modal(:task="taskDetailModalContent",
                            :columns="notDeletedColumns",
                            :subtaskTotalNumber="subtaskTotalNumber",
                            @completeTask="completeTask",
                            @uncompleteTask="uncompleteTask",
                            @deleteTask="deleteTask",
                            @switchLiked="switchLiked",
                            @closeTaskDetailModal="closeTaskDetailModal",
                            @completeSubtask="completeSubtask",
                            @uncompleteSubtask="uncompleteSubtask",
                            @openTaskDetailModal="openTaskDetailModal"
                            @addSubtask="addSubtask")
</template>

<script>
import draggable from 'vuedraggable'
import ContentHeader from '@/components/organisms/ContentHeader'
import TaskDetailModal from '@/components/organisms/TaskDetailModal'
import TaskTable from '@/components/organisms/TaskTable'

export default {
  components: {
    draggable,
    ContentHeader,
    TaskDetailModal,
    TaskTable
  },
  data () {
    return {
      columns: [
        { id: 1, deletedAt: '', label: 'タスク名', value: 'name', typeLabel: '文字列', typeValue: 'string', width: 240, visible: true },
        { id: 2, deletedAt: '', label: '担当者', value: 'person', typeLabel: '文字列', typeValue: 'string', width: 120, visible: true },
        { id: 3, deletedAt: '', label: '期日', value: 'deadline', typeLabel: '日付', typeValue: 'date', width: 120, visible: true },
        { id: 4, deletedAt: '', label: 'タグ', value: 'tag', typeLabel: '文字列', typeValue: 'string', width: 120, visible: true },
        { id: 5, deletedAt: '', label: 'その他', value: 'other', typeLabel: '文字列', typeValue: 'string', width: 120, visible: false }
      ],
      sections: [
        { id: 1, deletedAt: '', label: '', value: 'notSectioned' },
        { id: 2, deletedAt: '', label: '4/15~29のタスク', value: 'section1' },
        { id: 3, deletedAt: '', label: '5/04~20のタスク', value: 'section2' }
      ],
      activeSections: [2, 3],
      editingSectionId: '',
      taskTotalNumber: 6,
      subtaskTotalNumber: 3,
      tableData: {
        notSectioned: [{
            id: 1,
            completedAt: '',
            deletedAt: '',
            liked: true,
            data: {
              name: 'JavaScriptの勉強',
              person: 'ジョニーb',
              deadline: new Date(2020, 4, 24),
              tag: '個人学習',
              other: ''
            },
            subtasks: [{
                id: 1,
                completedAt: '',
                deletedAt: '',
                liked: false,
                data: {
                  name: '本を読む',
                  person: 'ジョニーc',
                  deadline: new Date(2020, 4, 24),
                  tag: '個人学習',
                  other: ''
                }
              }, {
                id: 2,
                completedAt: '',
                deletedAt: '',
                liked: true,
                data: {
                  name: 'JSのみでアプリを作ってみる',
                  person: 'ジョニーd',
                  deadline: new Date(2020, 4, 24),
                  tag: '個人学習',
                  other: ''
                }
            }],
            visibleSubtasks: false
        }],
        section1: [{
          id: 2,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'タスクの表示/追加/名前変更機能',
            person: 'ジョニーa',
            deadline: new Date(2020, 3, 16),
            tag: 'MVP',
            other: ''
          },
          subtasks: [{
              id: 3,
              completedAt: '',
              deletedAt: '',
              liked: false,
              data: {
                name: '新規ページの作成',
                person: 'ジョニーb',
                deadline: new Date(2020, 4, 24),
                tag: 'MVP',
                other: ''
              }
          }],
          visibleSubtasks: false
        }, {
          id: 3,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'セクションの表示/追加/名前変更機能',
            person: 'ジョニーc',
            deadline: new Date(2020, 3, 17),
            tag: 'MVP',
            other: ''
          },
          subtasks: [],
          visibleSubtasks: false
        }, {
          id: 4,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'セクションとタスクの紐付け',
            person: 'ジョニーa',
            deadline: new Date(2020, 3, 20),
            tag: 'MVP',
            other: ''
          },
          subtasks: [],
          visibleSubtasks: false
        }],
        section2: [{
          id: 5,
          completedAt: '',
          deletedAt: '',
          liked: true,
          data: {
            name: 'タスクへのいいね機能',
            person: 'ジョニーa',
            deadline: new Date(2020, 4, 4),
            tag: '開発目標',
            other: ''
          },
          subtasks: [],
          visibleSubtasks: false
        }, {
          id: 6,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'タスクの削除',
            person: 'ジョニーb',
            deadline: new Date(2020, 4, 5),
            tag: '開発目標',
            other: ''
          },
          subtasks: [],
          visibleSubtasks: false
        }]
      },
      sortRule: '',
      sortOrder: '',
      taskDetailModalContent: {},
      showTaskDetailModal: false
    }
  },
  computed: {
    visibleColumns () {
      return this.columns.filter((column) => {
        return column.deletedAt === '' && column.visible
      })
    },
    notDeletedColumns () {
      return this.columns.filter((column) => {
        return column.deletedAt === ''
      })
    }
  },
  methods: {
    addSection () {
      const newSectionId = this.sections.length
      const newSectionValue = 'section' + newSectionId
      this.sections.push({
        id: newSectionId,
        deletedAt: '',
        label: 'セクション' + newSectionId,
        value: newSectionValue
      })
      this.activeSections.push(newSectionId)
      this.$set(this.tableData, newSectionValue, [])
    },
    addTask (sectionValue, task) {
      this.tableData[sectionValue].push(task)
      this.taskTotalNumber += 1
    },
    addSubtask (task, subtask) {
      task.subtasks.push(subtask)
      this.subtaskTotalNumber += 1
    },
    addField (field) {
      this.columns.push(field)
      this.sections.forEach((section) => {
        this.tableData[section.value].forEach((task) => {
          this.$set(task.data, field.value, '')
        })
      })
    },
    editSectionTitle (id) {
      this.editingSectionId = id
    },
    judgeToEdit (id) {
      return id === this.editingSectionId
    },
    filterSections (sections) {
      return sections.filter((section) => {
        return section.value !== 'notSectioned' && section.deletedAt === ''
      })
    },
    filterTasks (tasks) {
      return tasks.filter((task) => {
        return task.deletedAt === '' && task.completedAt === ''
      })
    },
    completeTask (task, isMainTask) {
      task.completedAt = Date()
      if (isMainTask && task.id === this.taskDetailModalContent.id) {
        this.showTaskDetailModal = false
      }
    },
    uncompleteTask (task) {
      task.completedAt = ''
    },
    completeSubtask (subtask) {
      subtask.completedAt = Date()
    },
    uncompleteSubtask (subtask) {
      subtask.completedAt = ''
    },
    sortTasks () {
      this.sortRule = 'person'
      this.sortOrder = 'asc'
    },
    deleteSection (section) {
      this.$confirm(
        '紐付いたタスクを含む「' + section.label + '」のすべてが削除されます。',
        'セクションを削除してもよろしいですか？',
        {
          confirmButtonText: 'セクションを削除',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: section.label + 'は削除されました'
          })
          section.deletedAt = Date()
          this.showTaskDetailModal = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '削除はキャンセルされました'
          })
        })
    },
    deleteTask (task) {
      task.deletedAt = Date()
      this.showTaskDetailModal = false
    },
    deleteField (fieldValue) {
      const targetField = this.columns.find((column) =>{
        return column.value === fieldValue
      })
      this.$confirm(
        '紐付いた値を含む「' + targetField.label + '」のすべてが削除されます。',
        'フィールドを削除してもよろしいですか？',
        {
          confirmButtonText: 'フィールドを削除',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: targetField.label + 'は削除されました'
          })
          targetField.deletedAt = Date()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '削除はキャンセルされました'
          })
        })
    },
    switchLiked (task) {
      if (task.liked) {
        task.liked = false
      } else {
        task.liked = true
      }
    },
    openTaskDetailModal (task) {
      this.taskDetailModalContent = task
      this.showTaskDetailModal = true
    },
    closeTaskDetailModal () {
      this.showTaskDetailModal = false
      this.taskDetailModalContent = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-collapse-item__header {
    font-size: $basespace-300;
  }
  ::v-deep .el-collapse-item__content {
    font-size: $basespace-300;
  }
  .section-title-area ::v-deep .el-input__inner {
    border-color: transparent;
  }
  .is-editing ::v-deep .el-input__inner {
    border-color: $basecolor-secondary;
  }
  .task-detail-modal-area {
    position: fixed;
    top: 84px;
    right: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    box-shadow: -10px 0 10px $shadowcolor-base;
    transition: all 0.5s;
  }
  .task-detail-modal-enter {
    transform: translateX(100%);
  }
  .task-detail-modal-leave-to {
    transform: translateX(100%);
  }
</style>
