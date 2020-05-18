<template lang="pug">
  el-switch(v-model="internalValue")
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    internalValue: {
      get () {
        return this.value
      },
      set (newVal) {
        this.$emit('input', newVal)
      }
    }
  }
}
</script>
