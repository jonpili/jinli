<template lang="pug">
  el-button(@click="handleClick", icon="el-icon-check", size="mini")
    span 完了にする
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
