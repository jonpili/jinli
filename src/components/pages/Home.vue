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
                         :columns="notDeletedColumns",
                         @addTask="addTask",
                         @addSection="addSection",
                         @addField="addField",,
                         @changeFieldOrder="changeFieldOrder"
                         @deleteField="deleteField")
        //- TODO: 横にはみ出た場合にスクロールできるように
        el-main
          el-collapse(v-model="activeSections")
            j-table-header.ml-600(:columns="arrangeAsOrder(visibleColumns)", :sortRule="sortRule", :sortOrder="sortOrder", @sortTasks="sortTasks")
            draggable
              .not-sectioned-item
                task-table.mb-500(:tasks="filterTasks(tableData.notSectioned)",
                                  :columns="arrangeAsOrder(visibleColumns)",
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
                task-table.mt-100(:tasks="filterTasks(tableData[section.keyName])",
                                  :columns="arrangeAsOrder(visibleColumns)",
                                  :sortRule="sortRule",
                                  :sortOrder="sortOrder",
                                  @completeTask="completeTask",
                                  @switchLiked="switchLiked",
                                  @openTaskDetailModal="openTaskDetailModal")
      transition(name="task-detail-modal")
        .task-detail-modal-area(v-if="showTaskDetailModal")
          task-detail-modal(:task="taskDetailModalContent",
                            :columns="arrangeAsOrder(notDeletedColumns)",
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
        { id: 1, deletedAt: '', label: 'タスク名', keyName: 'name', typeLabel: '文字列', typeValue: 'string', width: 256, visible: true, order: 1 },
        { id: 2, deletedAt: '', label: '担当者', keyName: 'person', typeLabel: '文字列', typeValue: 'string', width: 128, visible: true, order: 2 },
        { id: 3, deletedAt: '', label: '期日', keyName: 'deadline', typeLabel: '日付', typeValue: 'date', width: 128, visible: true, order: 3 },
        { id: 4, deletedAt: '', label: '機能の開発区分', keyName: 'tag', typeLabel: '文字列', typeValue: 'string', width: 128, visible: true, order: 4 },
        { id: 5, deletedAt: '', label: 'その他', keyName: 'other', typeLabel: '文字列', typeValue: 'string', width: 128, visible: false, order: 5 }
      ],
      sections: [
      { id: 1, deletedAt: '', label: '4/15~29のタスク', keyName: 'section1' },
      { id: 2, deletedAt: '', label: '5/04~20のタスク', keyName: 'section2' }
      ],
      activeSections: [1, 2],
      editingSectionId: '',
      taskTotalNumber: 7,
      subtaskTotalNumber: 4,
      tableData: {
        notSectioned: [{
            id: 1,
            completedAt: '',
            deletedAt: '',
            liked: true,
            data: {
              name: 'JavaScriptの勉強',
              person: 'ジョニー',
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
                  person: 'ジョニー',
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
                  person: 'ジョニー',
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
            name: 'タスクの表示/追加/変更',
            person: 'Charly',
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
                name: '新規ページの作成/タスクの表示',
                person: 'Charly',
                deadline: new Date(2020, 3, 15),
                tag: 'MVP',
                other: ''
              },
            }, {
              id: 4,
              completedAt: '',
              deletedAt: '',
              liked: false,
              data: {
                name: 'タスクの追加/変更',
                person: 'Charly',
                deadline: new Date(2020, 3, 16),
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
            name: 'セクションの表示/追加/変更',
            person: 'Adam',
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
            person: 'Bob',
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
            name: 'タスクへのいいね',
            person: 'いいだ',
            deadline: new Date(2020, 4, 4),
            tag: '最終目標',
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
            name: 'タスク/セクションの削除',
            person: 'あかさか',
            deadline: new Date(2020, 4, 5),
            tag: '最終目標',
            other: ''
          },
          subtasks: [],
          visibleSubtasks: false
        }, {
          id: 7,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'フィールドの表示/追加/変更/削除',
            person: 'うちやま',
            deadline: new Date(2020, 4, 20),
            tag: 'ストレッチ目標',
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
    notDeletedColumns () {
      return this.columns.filter((column) => {
        return column.deletedAt === ''
      })
    },
    visibleColumns () {
      return this.columns.filter((column) => {
        return column.deletedAt === '' && column.visible
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
        keyName: newSectionValue
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
        this.tableData[section.keyName].forEach((task) => {
          this.$set(task.data, field.keyName, '')
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
        return section.deletedAt === ''
      })
    },
    filterTasks (tasks) {
      return tasks.filter((task) => {
        return task.deletedAt === '' && task.completedAt === ''
      })
    },
    arrangeAsOrder (values) {
      return values.slice().sort((valueA, valueB) => {
        return valueA.order - valueB.order
      })
    },
    changeFieldOrder (oldFieldOrder, newFieldOrder) {
      if (oldFieldOrder < newFieldOrder) {
        this.columns.forEach((column) => {
          if (column.order === oldFieldOrder) {
            column.order = newFieldOrder
          } else if (column.order > oldFieldOrder && column.order <= newFieldOrder) {
            column.order -= 1
          }
        })
      } else if (oldFieldOrder > newFieldOrder) {
        this.columns.forEach((column) => {
          if (column.order === oldFieldOrder) {
            column.order = newFieldOrder
          } else if (column.order < oldFieldOrder && column.order >= newFieldOrder) {
            column.order += 1
          }
        })
      }
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
    sortTasks (columnKeyName) {
      if (this.sortRule === columnKeyName) {
        if (this.sortOrder === 'asc') {
          this.sortRule = ''
          this.sortOrder = ''
        } else {
          this.sortOrder = 'asc'
        }
      } else {
        this.sortRule = columnKeyName
        this.sortOrder = 'desc'
      }
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
      const targetField = this.columns.find((column) => {
        return column.keyName === fieldValue
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
