<template lang="pug">
  div.pl-600
    el-input.header(v-model="columns[0].label", :style="{ width: columns[0].width + 'px' }", readonly)
    .open-detail-modal-button-area
    el-input.header(v-for="column in columns.slice(1)", :key="column.id", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
    draggable(group="tasks")
      transition-group(name="task-list", tag="div")
        .task-list-item(v-for="row in data", :key="row.id")
          j-move-icon
          j-complete-button(@click="completeTask(row.id)")
          el-input(v-model="row[columns[0].value]", :style="{ width: columns[0].width + 'px' }")
          .open-detail-modal-button-area(@click="openDetailModal(row.id)")
            span 詳細 >
          el-input(v-for="column in columns.slice(1)", :key="column.id", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
</template>

<script>
import draggable from 'vuedraggable'
import JMoveIcon from '@/components/atoms/JMoveIcon'
import JCompleteButton from '@/components/atoms/JCompleteButton'

export default {
  components: {
    draggable,
    JMoveIcon,
    JCompleteButton
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
    openDetailModal (taskId) {
      this.$emit('openDetailModal', taskId, this.sectionValue)
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
  .open-detail-modal-button-area {
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
