<template lang="pug">
  font-awesome-icon.button(:icon="['far', 'check-circle']", @click="handleClick")
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

<style lang="scss" scoped>
  .button {
    color: $bdcolor-dark;
    &:hover {
      color: $basecolor-success;
      cursor: pointer;
    }
  }
</style>
