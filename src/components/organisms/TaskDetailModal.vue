<template lang="pug">
  el-container
    el-header
      .header-button-area.my-300
        el-button.mr-a(@click="completeTask", icon="el-icon-check", size="mini") 完了にする
        div
          j-icon-button.mr-400(v-if="!task.liked", genre="far", value="thumbs-up", @click="switchLiked")
          j-icon-button.mr-400(v-else, genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked")
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
        .mt-500(v-if="task.subtasks.length > 0")
          .mb-100 サブタスク
          hr
        .subtask-list-item(v-for="subtask in task.subtasks")
          j-icon-button.ml-100(v-if="subtask.completedAt === ''", genre="far", value="check-circle", hover-color="default", @click="completeSubtask(subtask.id)")
          j-icon-button.ml-100(v-else, genre="far", value="check-circle", color="success", hover-color="success", @click="uncompleteSubtask(subtask.id)")
          el-input.subtask-name(v-model="subtask.data.name")
          .open-modal-button.fs-100(@click="openTaskDetailModal(subtask)") 詳細 ＞
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
    sectionValue: {
      type: String,
      default: 'notSectioned'
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
      this.$emit('completeTask', this.task)
    },
    deleteTask () {
      this.$emit('deleteTask', this.task)
    },
    switchLiked () {
      this.$emit('switchLiked', this.sectionValue, this.task.id)
    },
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
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
      this.$emit('addSubtask', this.sectionValue, this.task.id, emptySubtask)
    },
    completeSubtask (subtaskId) {
      this.$emit('completeSubtask', this.sectionValue, this.task.id, subtaskId)
    },
    uncompleteSubtask (subtaskId) {
      this.$emit('uncompleteSubtask', this.sectionValue, this.task.id, subtaskId)
    },
    openTaskDetailModal (subtask) {
      this.$emit('openTaskDetailModal', this.sectionValue, subtask)
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-button-area {
    display: flex;
    align-items: center;
  }
  .subtask-list-item {
    display: block;
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
  hr {
    margin: 0 0;
  }
</style>
