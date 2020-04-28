<template lang="pug">
  font-awesome-icon(:icon="[genre, value]", @click="handleClick")
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
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  classes (props) {
    return {
      'j-icon-button': true,
      'j-icon-button-default': props.type === 'default',
      'j-icon-button-success': props.type === 'success'
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
  .j-icon-button {
    color: $bdcolor-dark;
    cursor: pointer;
  }
  .j-icon-button-default{
    &:hover {
      color: $basecolor-success;
    }
  }
  .j-icon-button-success{
    &:hover {
      color: $basecolor-success;
    }
  }
</style>
