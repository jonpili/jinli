<template lang="pug">
  div
    .task-action-space-double(v-if="type === 'subtask'")
    .task-action-space(v-if="type === 'task'")
      j-icon-button(genre="fas", value="grip-vertical", type="grab")
    .task-action-space
      j-icon-button(genre="far", value="check-circle", hover-color="success", @click="completeTask(task)")
    template(v-for="(column, index) in columns")
      el-input(v-model="task.data[column.value]", :style="{ width: column.width + 'px' }")
      span(v-if="index === 0")
        .task-action-space(v-if="type === 'task'")
          div(v-if="filterSubtasks(task.subtasks).length > 0")
            j-icon-button(v-if="visibleSubtasks", genre="fas", value="code-branch", color="primary", hover-color="primary", @click="switchVisibleSubtasks")
            j-icon-button(v-else, genre="fas", value="code-branch", @click="switchVisibleSubtasks")
        .task-action-space
          j-icon-button(v-if="task.liked", genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked(task)")
        .task-action-space-double
          .open-modal-button.fs-200(@click="openTaskDetailModal(task)") 詳細 ＞
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
    columns: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'task'
    },
    visibleSubtasks: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    completeTask (task) {
      this.$emit('completeTask', task)
    },
    filterSubtasks (subtasks) {
      return subtasks.filter((subtask) => {
        return subtask.deletedAt === '' && subtask.completedAt === ''
      })
    },
    switchVisibleSubtasks () {
      console.log(this.visibleSubtasks);
      this.$emit('switchVisibleSubtasks')
    },
    switchLiked (task) {
      this.$emit('switchLiked', task)
    },
    openTaskDetailModal (task) {
      this.$emit('openTaskDetailModal', task)
    }
  }
}
</script>

<style lang="scss" scoped>
  .task-action-space {
    display: inline-block;
    width: $basespace-600;
    text-align: center;
  }
  .task-action-space-double {
    display: inline-block;
    width: $basespace-600 * 2;
    text-align: center;
  }
  .open-modal-button {
    display: inline-block;
    cursor: pointer;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
  }
</style>
