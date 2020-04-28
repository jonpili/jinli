<template lang="pug">
  div.pl-600
    el-input.header(v-for="column in columns", :key="column.id", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
    draggable(group="tasks")
      transition-group(name="task-list", tag="div")
        .task-list-item(v-for="row in data", :key="row.id")
          j-move-icon
          span.complete-button-area
            j-icon-button(@click="completeTask(row.id)")
          el-input(v-for="column in columns", :key="column.id", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
</template>

<script>
import draggable from 'vuedraggable'
import JMoveIcon from '@/components/atoms/JMoveIcon'
import JIconButton from '@/components/atoms/JIconButton'

export default {
  components: {
    draggable,
    JMoveIcon,
    JIconButton
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
</style>
