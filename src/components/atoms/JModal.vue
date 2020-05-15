<template lang="pug">
  .overlay(@click.self="closeModal")
    .window
      .contents
        slot
</template>

<script>
export default {
  methods: {
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .window {
    background: $bgcolor-base;
    border-radius: 4px;
    overflow: hidden;
  }
  .contents {
    padding: $basespace-100 $basespace-200;
  }
</style>
