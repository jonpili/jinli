<template lang="pug">
  div.pl-600
    template(v-for="(column, index) in columns")
      el-input.header(v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
      span(v-if="index === 0")
        .task-action-space
    draggable(group="tasks")
      transition-group(name="task-list", tag="div")
        .task-list-item(v-for="task in tasks", :key="task.id")
          j-move-icon
          span.complete-button-area
            j-icon-button(genre="far", value="check-circle", hover-color="success", @click="completeTask(task)")
          template(v-for="(column, index) in columns")
            el-input(v-model="task.data[column.value]", :style="{ width: column.width + 'px' }")
            span(v-if="index === 0")
              .task-action-space
                j-icon-button(v-if="filterSubtasks(task.subtasks).length > 0", genre="fas", value="code-branch", color="primary", hover-color="primary", @click="")
              .task-action-space
                j-icon-button(v-if="task.liked", genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked(task)")
              .task-action-space-double
                .open-modal-button.fs-100(@click="openTaskDetailModal(task)") 詳細 ＞
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
    sectionValue: {
      type: String,
      default: 'notSectioned'
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
    margin-left: 68px;
    border: none;
  }
  ::v-deep .el-input__inner {
    height: $basespace-600;
    border-radius: 0px;
  }
  .task-list-item {
    transition: all 0.5s;
  }
  .task-list-enter {
    opacity: 0;
    transform: translateX($basespace-500 * -10);
  }
  .task-list-leave-to {
    opacity: 0;
    transform: translateX($basespace-500 * 10);
  }
  .complete-button-area {
    margin: 0 $basespace-100;
    vertical-align: middle;
  }
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
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
</style>
