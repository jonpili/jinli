<template lang="pug">
  div.pl-600
    template(v-for="(column, index) in columns")
      el-input.header(v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
      span(v-if="index === 0")
        .task-action-space-all
    draggable(group="tasks")
      transition-group(name="task-table", tag="div")
        .task-table-item(v-for="task in tasks", :key="task.id")
          j-task-line(:task="task",
                      :columns="columns",
                      @completeTask="completeTask",
                      @displaySubtasks="displaySubtasks",
                      @switchLiked="switchLiked",
                      @openTaskDetailModal="openTaskDetailModal")
          div(v-for="subtask in filterSubtasks(task.subtasks)", :key="subtask.id")
            j-task-line(:task="subtask",
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
    }
  },
  methods: {
    completeTask (task) {
      this.$emit('completeTask', task)
    },
    filterSubtasks (subtasks) {
      return subtasks.filter((subtask) => {
        return subtask.deletedAt === ''
      })
    },
    displaySubtasks (subtasks) {
      console.log(subtasks);
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
  .header ::v-deep .el-input__inner {
    margin-left: $basespace-600 * 2;
    border: none;
  }
  ::v-deep .el-input__inner {
    height: $basespace-600;
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
  .task-action-space-all {
    display: inline-block;
    width: $basespace-600 * 4;
  }
</style>
