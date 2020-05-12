<template lang="pug">
  div.pl-600
    template(v-for="(column, index) in columns")
      el-input.header(v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
      span(v-if="index === 0")
        .task-action-space
    draggable(group="tasks")
      transition-group(name="task-list", tag="div")
        .task-list-item(v-for="row in data", :key="row.id")
          j-move-icon
          span.complete-button-area
            j-icon-button(genre="far", value="check-circle", hover-color="success", @click="completeTask(row.id)")
          template(v-for="(column, index) in columns")
            el-input(v-model="row.data[column.value]", :style="{ width: column.width + 'px' }")
            span(v-if="index === 0")
              .task-action-space
                j-icon-button.mx-100(v-if="row.liked", genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked(row.id)")
                .open-modal-button.fs-100.mx-200(@click="openTaskDetailModal(row)") 詳細 ＞
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    data: {
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
    completeTask (taskId) {
      this.$emit('completeTask', this.sectionValue, taskId)
    },
    switchLiked (taskId) {
      this.$emit('switchLiked', this.sectionValue, taskId)
    },
    openTaskDetailModal (task) {
      this.$emit('openTaskDetailModal', this.sectionValue, task)
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
    text-align: right;
    width: $basespace-600 * 3;
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
