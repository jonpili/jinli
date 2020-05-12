<template lang="pug">
  el-container
    el-header(height="84px")
      img(src="@/assets/logo.png")
      hr
    el-main
      el-container
        el-header.mb-600
          content-header(:sectionList="filterSections(sectionList)", :tableData="tableData", :taskTotalNumber="taskTotalNumber", @addTask="addTask", @addSection="addSection")
          hr
        el-main
          el-collapse(v-model="activeSections")
            draggable
              task-table.mb-500(:data="filterTasks(tableData.notSectioned)",
                                :columns="columnList",
                                @completeTask="completeTask",
                                @switchLiked="switchLiked",
                                @openTaskDetailModal="openTaskDetailModal")
              el-collapse-item(v-for="section in filterSections(sectionList)", :key="section.id", :title="section.label", :name="section.id", :disabled="judgeToEdit(section.id)")
                template(slot="title")
                  j-move-icon
                  .section-title-area
                    el-input(v-model="section.label", @click.native="editSectionTitle(section.id)", @blur="editingSectionId = ''", size="medium", :class="{ 'is-editing': judgeToEdit(section.id) }")
                  j-icon-button(genre="far", value="trash-alt", @click.stop="deleteSection(section)")
                task-table.mt-100(:data="filterTasks(tableData[section.value])",
                                  :columns="columnList",
                                  :sectionValue="section.value",
                                  @completeTask="completeTask",
                                  @switchLiked="switchLiked",
                                  @openTaskDetailModal="openTaskDetailModal")
      transition(name="task-detail-modal")
        .task-detail-modal-area(v-if="showTaskDetailModal")
          task-detail-modal(:task="taskDetailModalContent",
                            :sectionValue="taskDetailModalSectionValue",
                            :columnList="columnList",
                            @completeTask="completeTask",
                            @deleteTask="deleteTask",
                            @switchLiked="switchLiked",
                            @closeTaskDetailModal="closeTaskDetailModal",
                            @completeSubtask="completeSubtask",
                            @uncompleteSubtask="uncompleteSubtask",
                            @addSubtask="addSubtask")
</template>

<script>
import draggable from 'vuedraggable'
import ContentHeader from '@/components/organisms/ContentHeader'
import TaskDetailModal from '@/components/organisms/TaskDetailModal'
import TaskTable from '@/components/molecules/TaskTable'

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
            liked: false,
            data: {
              name: 'JavaScriptの勉強',
              person: 'ジョニー',
              deadline: '5/24',
              tag: '個人学習',
              other: ''
            },
            subtasks: []
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
          subtasks: []
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
          liked: false,
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
      taskDetailModalSectionValue: '',
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
    addSubtask (sectionValue, taskId, subtask) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      targetTask.subtasks.push(subtask)
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
        return task.completedAt === '' && task.deletedAt === ''
      })
    },
    completeTask (sectionValue, taskId) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      targetTask.completedAt = Date()
      this.taskTotalNumber -= 1
      if (taskId === this.taskDetailModalContent.id) {
        this.showTaskDetailModal = false
      }
    },
    completeSubtask (sectionValue, taskId, subtaskId) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      const targetSubtask = targetTask.subtasks.find((subtask) => {
        return subtask.id === subtaskId
      })
      targetSubtask.completedAt = Date()
    },
    uncompleteSubtask (sectionValue, taskId, subtaskId) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      const targetSubtask = targetTask.subtasks.find((subtask) => {
        return subtask.id === subtaskId
      })
      targetSubtask.completedAt = ''
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
    deleteTask (sectionValue, taskId) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      targetTask.deletedAt = Date()
      this.taskTotalNumber -= 1
      this.showTaskDetailModal = false
    },
    switchLiked (sectionValue, taskId) {
      const targetTask = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      if (targetTask.liked) {
        targetTask.liked = false
      } else {
        targetTask.liked = true
      }
    },
    openTaskDetailModal (sectionValue, taskId) {
      this.taskDetailModalSectionValue = sectionValue
      this.taskDetailModalContent = this.tableData[sectionValue].find((task) => {
        return task.id === taskId
      })
      this.showTaskDetailModal = true
    },
    closeTaskDetailModal () {
      this.showTaskDetailModal = false
      this.taskDetailModalSectionValue = ''
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
    border-color: #409EFF;
  }

  .task-detail-modal-area {
    position: fixed;
    top: 58px;
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
