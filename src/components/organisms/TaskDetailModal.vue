<template lang="pug">
  el-container
    el-header.pt-200
      font-awesome-icon.close-button(:icon="['fas', 'chevron-right']", @click="closeTaskDetailModal")
    el-main
      div(v-for="taskItem in task") {{ taskItem }}
</template>

<script>
export default {
  props: {
    task: Object
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
