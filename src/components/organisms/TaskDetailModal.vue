<template lang="pug">
  el-container
    el-header
      font-awesome-icon(:icon="['far', 'check-circle']", @click="closeTaskDetailModal")
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
