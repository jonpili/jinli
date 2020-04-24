<template lang="pug">
  el-container
    el-header
    el-main
      div(v-for="taskItem in task") {{ taskItem }}
</template>

<script>
export default {
  props: {
    task: Object
  }
}
</script>
