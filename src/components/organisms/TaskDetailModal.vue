<template lang="pug">
  el-container
    el-header
      .header-button-area.my-300
        el-button.mr-a(@click="completeTask", icon="el-icon-check", size="mini") 完了にする
        div
          j-icon-button.mr-400(v-if="!task.liked", genre="far", value="thumbs-up", @click="switchLiked")
          j-icon-button.mr-400(v-else, genre="far", value="thumbs-up", color="primary", hover-color="primary", @click="switchLiked")
        j-icon-button.mr-400(genre="far", value="trash-alt", @click="deleteTask")
        j-icon-button.mr-200(genre="fas", value="chevron-right", @click="closeTaskDetailModal")
      hr
    el-main
      .fs-600.fw-bold.mb-400 {{ task.data[columnList[0].value] }}
      el-row.mb-200(v-for="column in columnList.slice(1)", :key="column.id")
        el-col.pt-100(:span="6")
          span {{ column.label }}
        el-col(:span="18")
          el-input(v-model="task.data[column.value]")
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: function () {
        return {}
      }
    },
    sectionValue: {
      type: String,
      default: 'notSectioned'
    },
    columnList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    completeTask () {
      this.$emit('completeTask', this.task.id, this.sectionValue)
    },
    deleteTask () {
      this.$emit('deleteTask', this.task.id, this.sectionValue)
    },
    switchLiked () {
      this.$emit('switchLiked', this.task.id, this.sectionValue)
    },
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-button-area {
    display: flex;
    align-items: center;
  }
</style>
