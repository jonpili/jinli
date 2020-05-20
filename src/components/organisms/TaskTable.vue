<template lang="pug">
  div.pl-600
    draggable(group="tasks")
      transition-group(name="task-table", tag="div")
        .task-table-item(v-for="task in sortedTasks", :key="task.id")
          j-table-line(:task="task",
                      :columns="columns",
                      @completeTask="completeTask",
                      @switchVisibleSubtasks="switchVisibleSubtasks",
                      @switchLiked="switchLiked",
                      @openTaskDetailModal="openTaskDetailModal")
          transition-group(name="subtask-table", tag="div")
            .subtask-table-item(v-if="task.visibleSubtasks", v-for="subtask in filterSubtasks(task.subtasks)", :key="subtask.id")
              j-table-line(:task="subtask",
                          :columns="columns",
                          type="subtask",
                          @completeTask="completeTask",
                          @switchLiked="switchLiked",
                          @openTaskDetailModal="openTaskDetailModal")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    tasks: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      required: true
    },
    sortKeyName: {
      type: String,
      default: ''
    },
    sortOrder: {
      type: String,
      default:''
    }
  },
  computed: {
    sortedTasks () {
      if (this.sortKeyName === '') {
        return this.tasks
      } else {
        return this.sortTask(this.tasks, this.sortOrder)
      }
    }
  },
  methods: {
    completeTask (task) {
      const isMainTask = 'subtasks' in task
      this.$emit('completeTask', task, isMainTask)
    },
    sortTask (tasks, order) {
      return tasks.slice().sort((taskA, taskB) => {
        const valueA = taskA.data[this.sortKeyName]
        const valueB = taskB.data[this.sortKeyName]
        if (order === 'asc') {
          return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0
        } else {
          return (valueA < valueB) ? 1 : (valueA > valueB) ? -1 : 0
        }
      })
    },
    filterSubtasks (subtasks) {
      return subtasks.filter((subtask) => {
        return subtask.deletedAt === '' && subtask.completedAt === ''
      })
    },
    switchVisibleSubtasks (task) {
      if (task.visibleSubtasks) {
        task.visibleSubtasks = false
      } else {
        task.visibleSubtasks = true
      }
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
  ::v-deep .el-input__inner {
    border-radius: 0px;
  }
  .task-table-item {
    transition: all 0.5s;
  }
  .task-table-enter {
    opacity: 0;
    transform: translateX($basespace-500 * -10);
  }
  .task-table-leave-to {
    opacity: 0;
    transform: translateX($basespace-500 * 10);
  }
  .subtask-table-item {
    transition: all 0.25s;
  }
  .subtask-table-enter {
    opacity: 0;
  }
  .subtask-table-leave-to {
    opacity: 0;
  }
</style>
