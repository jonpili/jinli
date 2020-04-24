<template lang="pug">
  el-container
    el-header
      .header-button-area
        j-complete-button-square(@click="completeTask")
        font-awesome-icon.close-button.mr-200(:icon="['fas', 'chevron-right']", @click="closeTaskDetailModal")
      hr
    el-main
      .fs-600.fw-bold.mb-400 {{ task[columnList[0].value] }}
      el-row.mb-200(v-for="column in columnList.slice(1)")
        el-col.pt-100(:span="6")
          span {{ column.label }}
        el-col(:span="18")
          el-input(v-model="task[column.value]")
</template>

<script>
import JCompleteButtonSquare from '@/components/atoms/JCompleteButtonSquare'

export default {
  components: {
    JCompleteButtonSquare
  },
  props: {
    task: Object,
    sectionValue: String,
    columnList: Array
  },
  methods: {
    completeTask () {
      this.$emit('completeTask', this.task.id, this.sectionValue)
    },
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-button-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: $basespace-300 0 $basespace-200;
  }
  .complete-button {
    color: $textcolor-light;
  }
  .close-button {
    font-size: $basespace-400;
    color: $textcolor-light;
    &:hover {
      color: $textcolor-base;
      cursor: pointer;
    }
  }
</style>
