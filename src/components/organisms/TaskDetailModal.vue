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
      el-button.mt-200(@click="addSubtask", icon="el-icon-plus", type="text") サブタスクを追加
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
      this.$emit('completeTask', this.sectionValue, this.task.id)
    },
    deleteTask () {
      this.$emit('deleteTask', this.sectionValue, this.task.id)
    },
    switchLiked () {
      this.$emit('switchLiked', this.sectionValue, this.task.id)
    },
    closeTaskDetailModal () {
      this.$emit('closeTaskDetailModal')
    },
    addSubtask () {
      const emptySubtask = {
        id: this.task.subtasks.length + 1,
        completedAt: '',
        deletedAt: '',
        liked: false,
        data: {
          name: '',
          person: '',
          deadline: '',
          tag: '',
          other: ''
        }
      }
      this.$emit('addSubtask', this.sectionValue, this.task.id, emptySubtask)
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
