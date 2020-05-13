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
    color: {
      type: String,
      default: 'default'
    },
    hoverColor: {
      type: String,
      default: 'default'
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  classes (props) {
    return {
      'j-icon-button': true,
      'j-icon-button-default': props.color === 'default',
      'j-icon-button-primary': props.color === 'primary',
      'j-icon-button-success': props.color === 'success',
      'j-icon-button-hover-default': props.hoverColor === 'default',
      'j-icon-button-hover-primary': props.hoverColor === 'primary',
      'j-icon-button-hover-success': props.hoverColor === 'success',
      'j-icon-button-grab': props.type === 'grab'
    }
  }
}
</script>

<style lang="scss" scoped>
  .j-icon-button {
    cursor: pointer;
  }
  .j-icon-button-default {
    color: $bdcolor-base;
  }
  .j-icon-button-primary {
    color: $basecolor-secondary;
  }
  .j-icon-button-success {
    color: $basecolor-success;
  }
  .j-icon-button-hover-default {
    &:hover {
      color: $bdcolor-dark;
    }
  }
  .j-icon-button-hover-primary {
    &:hover {
      color: $basecolor-secondary;
    }
  }
  .j-icon-button-hover-success {
    &:hover {
      color: $basecolor-success;
    }
  }
  .j-icon-button-grab {
    &:hover {
      opacity: 1.0;
      cursor: grab;
    }
    &:active {
      cursor: grabbing;
    }
  }
</style>
