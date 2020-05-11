<template lang="pug">
  div
    .mb-100
      el-button(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus", size="mini") タスクを追加
      el-select.ml-100(v-model="selectedSectionValue", :disabled="existEmptyTask", placeholder="セクションを選択", size="mini", clearable)
        el-option(v-for="section in sectionList", :key="section.id", :label="section.label", :value="section.value")
      el-tag.ml-100(v-if="existEmptyTask", size="small", type="danger", effect="plain") 空のタスクが存在します
    .mb-500
      el-button(@click="addSection", icon="el-icon-plus", size="mini") セクションを追加
</template>

<script>
export default {
  props: {
    sectionList: Array,
    tableData: Object,
    taskTotalNumber: Number
  },
  data () {
    return {
      selectedSectionValue: ''
    }
  },
  computed: {
    existEmptyTask () {
      const tableDataKeysArray = Object.keys(this.tableData)
      const allTasks = tableDataKeysArray.reduce((acc, key) => {
        return acc.concat(this.tableData[key])
      }, [])
      const emptyTasks = allTasks.filter((task) => {
        return task.data.name === ''
      })
      return emptyTasks.length > 0
    }
  },
  methods: {
    addTask () {
      const emptyTask = {
        id: this.taskTotalNumber+ 1,
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
      if (this.selectedSectionValue === '') {
        this.$emit('addTask', 'notSectioned', emptyTask)
      } else {
        this.$emit('addTask', this.selectedSectionValue, emptyTask)
      }
      this.selectedSectionValue = ''
    },
    addSection () {
      this.$emit('addSection')
    }
  }
}
</script>
