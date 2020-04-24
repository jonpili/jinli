<template lang="pug">
  el-container
    el-header.pt-200
      font-awesome-icon.close-button(:icon="['fas', 'chevron-right']", @click="closeTaskDetailModal")
    el-main
      .fs-700.fw-bold {{ task.name }}
      div(v-for="column in columnList")
        span {{ column.label }}
        span {{ task[column.value] }}
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
    color: $textcolor-light;
    &:hover {
      color: $textcolor-base;
      cursor: pointer;
    }
  }
</style>
