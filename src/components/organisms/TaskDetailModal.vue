<template lang="pug">
  el-container
    el-header(height="68px")
      .header-button-area.my-400
        el-button.mr-a(v-if="task.completedAt === ''", @click="completeTask", icon="el-icon-check", size="mini", type="success", plain) 完了にする
        el-button.mr-a(v-else, @click="uncompleteTask", icon="el-icon-check", size="mini", type="success") 完了済み
        div
          j-icon-button.mr-400(v-if="!task.liked", genre="far", value="thumbs-up", @click="switchLiked(task)")
          j-icon-button.mr-400(v-else, genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked(task)")
        j-icon-button.mr-400(genre="far", value="trash-alt", @click="deleteTask")
        j-icon-button.mr-200(genre="fas", value="chevron-right", @click="closeTaskDetailModal")
    hr
    el-main
      .fs-600.fw-bold.mb-400 {{ task.data[columnList[0].value] }}
      el-row.mb-200(v-for="column in columnList.slice(1)", :key="column.id")
        el-col.pt-100(:span="6")
          span {{ column.label }}
        el-col(:span="18")
          el-input(v-model="task.data[column.value]")
      .mt-200(v-if="'subtasks' in task")
        .mt-500(v-if="filterSubtasks(task.subtasks).length > 0")
          .mb-100 サブタスク
          hr
        div(v-for="subtask in filterSubtasks(task.subtasks)")
          .task-action-space
            j-icon-button(v-if="subtask.completedAt === ''", genre="far", value="check-circle", hover-color="default", @click="completeSubtask(subtask)")
            j-icon-button(v-else, genre="far", value="check-circle", color="success", hover-color="success", @click="uncompleteSubtask(subtask)")
          el-input.subtask-name(v-model="subtask.data.name")
          .task-action-space
            j-icon-button(v-if="subtask.liked", genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked(subtask)")
          .task-action-space-double
            .open-modal-button.fs-200(@click="openTaskDetailModal(subtask)") 詳細 ＞
          hr
        el-button(@click="addSubtask", icon="el-icon-plus", type="text") サブタスクを追加
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: function () {
        return {}
      }
    },
    columnList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    completeTask () {
      const isMainTask = Object.prototype.hasOwnProperty.call(this.task, 'subtasks')
      this.$emit('completeTask', this.task, isMainTask)
    },
    uncompleteTask () {
      this.$emit('uncompleteTask', this.task)
    },
    deleteTask () {
      this.$emit('deleteTask', this.task)
    },
    switchLiked (task) {
      this.$emit('switchLiked', task)
    },
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
    },
    filterSubtasks (subtasks) {
      return subtasks.filter((subtask) => {
        return subtask.deletedAt === ''
      })
    },
    addSubtask () {
      const emptySubtask = {
        id: this.task.subtasks.length + 1,
        completedAt: '',
        deletedAt: '',
        liked: false,
        data: {
          name: '',
          person: '',
          deadline: '',
          tag: '',
          other: ''
        }
      }
      this.$emit('addSubtask', this.task, emptySubtask)
    },
    completeSubtask (subtask) {
      this.$emit('completeSubtask', subtask)
    },
    uncompleteSubtask (subtask) {
      this.$emit('uncompleteSubtask', subtask)
    },
    openTaskDetailModal (subtask) {
      this.$emit('openTaskDetailModal', subtask)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-button-area {
    display: flex;
    align-items: center;
  }
  .task-action-space {
    display: inline-block;
    width: 5%;
    text-align: center;
  }
  .task-action-space-double {
    display: inline-block;
    width: 10%;
    text-align: center;
  }
  .subtask-name {
    width: 80%;
  }
  .subtask-name ::v-deep .el-input__inner {
    height: $basespace-600;
    border-color: transparent;
  }
  .open-modal-button {
    display: inline-block;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
</style>
