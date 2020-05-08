<template functional lang="pug">
  font-awesome-icon(:icon="[props.genre, props.value]", :class="[data.class, data.staticClass, $options.classes(props)]", v-on="listeners")
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
  }
}
</script>

<style lang="scss" scoped>
  .j-icon-button {
    color: $bdcolor-base;
    cursor: pointer;
  }
  .j-icon-button-default{
    &:hover {
      color: $bdcolor-dark;
    }
  }
  .j-icon-button-success{
    &:hover {
      color: $basecolor-success;
    }
  }
</style>
