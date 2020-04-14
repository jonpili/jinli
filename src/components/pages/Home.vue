<template lang="pug">
  .home
    h1 {{ msg }}
</template>

<script>
export default {
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    margin: 40px 0 0;
  }
</style>
