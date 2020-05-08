<template lang="pug">
  div.pl-600
    template(v-for="(column, index) in columns")
      el-input.header(v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
      .open-modal-button-area(v-if="index === 0")
    draggable(group="tasks")
      transition-group(name="task-list", tag="div")
        .task-list-item(v-for="row in data", :key="row.id")
          j-move-icon
          span.complete-button-area
            j-icon-button(genre="far", value="check-circle", type="success", @click="completeTask(row.id)")
          template(v-for="(column, index) in columns")
            el-input(v-model="row.data[column.value]", :style="{ width: column.width + 'px' }")
            .open-modal-button-area(v-if="index === 0", @click="openTaskDetailModal(row.id)")
              span 詳細 >
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
      this.$emit('completeTask', taskId, this.sectionValue)
    },
    openTaskDetailModal (taskId) {
      this.$emit('openTaskDetailModal', taskId, this.sectionValue)
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
  .open-modal-button-area {
    display: inline-block;
    text-align: center;
    width: $basespace-600 * 2;
    font-size: $basespace-200;
    cursor: pointer;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
</style>
