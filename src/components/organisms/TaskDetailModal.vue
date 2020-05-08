<template lang="pug">
  el-container
    el-header
      .header-button-area.my-300
        el-button(@click="completeTask", icon="el-icon-check", size="mini") 完了にする
        j-icon-button.ml-a.mr-400(genre="far", value="thumbs-up", @click="closeTaskDetailModal")
        j-icon-button.mr-200(genre="fas", value="chevron-right", @click="closeTaskDetailModal")
      hr
    el-main
      .fs-600.fw-bold.mb-400 {{ task[columnList[0].value] }}
      el-row.mb-200(v-for="column in columnList.slice(1)", :key="column.id")
        el-col.pt-100(:span="6")
          span {{ column.label }}
        el-col(:span="18")
          el-input(v-model="task[column.value]")
</template>

<script>
export default {
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
    align-items: center;
  }
</style>
