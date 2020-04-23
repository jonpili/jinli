<template lang="pug">
  div.pl-600
    el-input.header(v-for="column in columns", :key="column.id", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
    draggable(group="tasks")
      transition-group(name="list", tag="div")
        div(v-for="row in data", :key="row.id")
          j-move-icon
          j-complete-button(@click="completeTask(row.id)")
          el-input(v-for="column in columns", :key="column.id", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
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
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
