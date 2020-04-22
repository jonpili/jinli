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
    activeSections: Array,
    tableData: Object,
    taskTotalNumber: Number
  },
  data () {
    return {
      selectedSectionValue: '',
      currentTaskTotalNumber: this.taskTotalNumber
    }
  },
  computed: {
    existEmptyTask () {
      // const tableDataKeysArray = Object.keys(this.tableData)
      // console.log(tableDataKeysArray)
      // const allTasks = tableDataKeysArray.reduce((acc, key) => {
      //   console.log(this.tableData[key])
      //   return acc.concat(this.tableData[key])
      // })
      // console.log(allTasks)
      return false
    }
  },
  methods: {
    addTask () {
      const emptyTask = {
        id: this.currentTaskTotalNumber+ 1,
        name: '',
        person: '',
        deadline: '',
        tag: '',
        other: ''
      }
      if (this.selectedSectionValue === '') {
        this.tableData.notSectioned.push(emptyTask)
      } else {
        this.tableData[this.selectedSectionValue].push(emptyTask)
      }
      this.currentTaskTotalNumber += 1
      this.selectedSectionValue = ''
    },
    addSection () {
      const newSectionId = this.sectionList.length + 1
      this.sectionList.push({
        id: newSectionId,
        label: 'セクション' + newSectionId,
        value: 'section' + newSectionId
      })
      this.activeSections.push(newSectionId)
    }
  }
}
</script>
