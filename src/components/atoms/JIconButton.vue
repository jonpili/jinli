<template lang="pug">
  font-awesome-icon.button(:icon="[genre, value]", @click="handleClick")
</template>

<script>
export default {
  props: {
    genre: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
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
