<template lang="pug">
  div.pl-600
    el-input.header(v-for="column in columns", :key="column.id", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
    draggable(group="tasks")
      div(v-for="row in data")
        j-move-icon
        j-complete-button(@click="completeTask(row.id)")
        el-input(v-for="column in columns", :key="column.id", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
</template>

<script>
import draggable from 'vuedraggable'
import jMoveIcon from '@/components/atoms/jMoveIcon'
import jCompleteButton from '@/components/atoms/jCompleteButton'

export default {
  components: {
    draggable,
    jMoveIcon,
    jCompleteButton
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
</style>
