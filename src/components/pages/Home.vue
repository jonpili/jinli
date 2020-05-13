<template lang="pug">
  el-container
    el-header(height="75px")
      img(src="@/assets/logo.png")
    hr
    el-main
      el-container
        el-header
          content-header.mb-200(:sectionList="filterSections(sectionList)", :tableData="tableData", :taskTotalNumber="taskTotalNumber", @addTask="addTask", @addSection="addSection")
          hr
        el-main
          el-collapse(v-model="activeSections")
            draggable
              task-table.mb-500(:tasks="filterTasks(tableData.notSectioned)",
                                :columns="columnList",
                                @completeTask="completeTask",
                                @switchLiked="switchLiked",
                                @openTaskDetailModal="openTaskDetailModal")
              el-collapse-item(v-for="section in filterSections(sectionList)", :key="section.id", :title="section.label", :name="section.id", :disabled="judgeToEdit(section.id)")
                template(slot="title")
                  j-icon-button(genre="fas", value="grip-vertical", type="grab")
                  .section-title-area.ml-200
                    el-input(v-model="section.label", @click.native="editSectionTitle(section.id)", @blur="editingSectionId = ''", size="medium", :class="{ 'is-editing': judgeToEdit(section.id) }")
                  j-icon-button.ml-200(genre="far", value="trash-alt", @click.stop="deleteSection(section)")
                task-table.mt-100(:tasks="filterTasks(tableData[section.value])",
                                  :columns="columnList",
                                  :sectionValue="section.value",
                                  @completeTask="completeTask",
                                  @switchLiked="switchLiked",
                                  @openTaskDetailModal="openTaskDetailModal")
      transition(name="task-detail-modal")
        .task-detail-modal-area(v-if="showTaskDetailModal")
          task-detail-modal(:task="taskDetailModalContent",
                            :columnList="columnList",
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
      columnList: [
        { id: 1, label: 'タスク名', value: 'name', width: 240 },
        { id: 2, label: '担当者', value: 'person', width: 100 },
        { id: 3, label: '期日', value: 'deadline', width: 100 },
        { id: 4, label: 'タグ', value: 'tag', width: 100 },
        { id: 5, label: 'その他', value: 'other', width: 100 }
      ],
      sectionList: [
        { id: 1, deletedAt: '', label: '4/15~29のタスク', value: 'section1' },
        { id: 2, deletedAt: '', label: '5/04~20のタスク', value: 'section2' }
      ],
      activeSections: [1, 2],
      editingSectionId: '',
      taskTotalNumber: 6,
      tableData: {
        notSectioned: [{
            id: 1,
            completedAt: '',
            deletedAt: '',
            liked: true,
            data: {
              name: 'JavaScriptの勉強',
              person: 'ジョニー',
              deadline: '5/24',
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
                  deadline: '5/24',
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
                  deadline: '5/24',
                  tag: '個人学習',
                  other: ''
                }
            }]
        }],
        section1: [{
          id: 2,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'タスクの表示/追加/名前変更機能',
            person: 'ジョニー',
            deadline: '4/16',
            tag: 'MVP',
            other: ''
          },
          subtasks: [{
              id: 1,
              completedAt: '',
              deletedAt: '',
              liked: false,
              data: {
                name: '新規ページの作成',
                person: 'ジョニー',
                deadline: '5/24',
                tag: 'MVP',
                other: ''
              }
          }]
        }, {
          id: 3,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'セクションの表示/追加/名前変更機能',
            person: 'ジョニー',
            deadline: '4/17',
            tag: 'MVP',
            other: ''
          },
          subtasks: []
        }, {
          id: 4,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'セクションとタスクの紐付け',
            person: 'ジョニー',
            deadline: '4/20',
            tag: 'MVP',
            other: ''
          },
          subtasks: []
        }],
        section2: [{
          id: 5,
          completedAt: '',
          deletedAt: '',
          liked: true,
          data: {
            name: 'タスクへのいいね機能',
            person: 'ジョニー',
            deadline: '5/04',
            tag: '開発目標',
            other: ''
          },
          subtasks: []
        }, {
          id: 6,
          completedAt: '',
          deletedAt: '',
          liked: false,
          data: {
            name: 'タスクの削除',
            person: 'ジョニー',
            deadline: '5/05',
            tag: '開発目標',
            other: ''
          },
          subtasks: []
        }]
      },
      taskDetailModalContent: {},
      showTaskDetailModal: false
    }
  },
  methods: {
    addSection () {
      const newSectionId = this.sectionList.length + 1
      const newSectionValue = 'section' + newSectionId
      this.sectionList.push({
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
