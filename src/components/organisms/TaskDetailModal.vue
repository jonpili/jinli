<template lang="pug">
  el-container
    el-header
      .pt-400.pb-100.pl-500
        font-awesome-icon.close-button(:icon="['fas', 'chevron-right']", @click="closeTaskDetailModal")
      hr
    el-main
      .fs-600.fw-bold.mb-400 {{ task.name }}
      el-row.mb-200(v-for="column in columnList.slice(1)")
        el-col.pt-100(:span="6")
          span {{ column.label }}
        el-col(:span="18")
          el-input(v-model="task[column.value]")
</template>

<script>
export default {
  props: {
    task: Object,
    columnList: Array
  },
  methods: {
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
    }
  }
}
</script>

<style lang="scss" scoped>
  .close-button {
    font-size: $basespace-500;
    color: $textcolor-light;
    &:hover {
      color: $textcolor-base;
      cursor: pointer;
    }
  }
</style>
