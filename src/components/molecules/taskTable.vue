<template lang="pug">
  div.pl-600
    el-input.header(v-for="column in columns", :key="column.id", v-model="column.label", :style="{ width: column.width + 'px' }", readonly)
    draggable(group="tasks")
      div(v-for="row in data")
        j-move-icon
        j-done-button
        el-input(v-for="column in columns", :key="column.id", v-model="row[column.value]", :style="{ width: column.width + 'px' }")
</template>

<script>
import draggable from 'vuedraggable'
import jMoveIcon from '@/components/atoms/jMoveIcon'
import jDoneButton from '@/components/atoms/jDoneButton'

export default {
  components: {
    draggable,
    jMoveIcon,
    jDoneButton
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
