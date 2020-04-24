<template lang="pug">
  div
    div(v-for="taskItem in task") {{ taskItem }}
</template>

<script>
export default {
  props: {
    task: Object
  }
}
</script>
