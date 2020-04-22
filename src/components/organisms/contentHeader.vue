<template lang="pug">
  div
    .mb-100
      el-button(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus", size="mini") タスクを追加
      el-select.ml-100(v-model="selectedSectionValue", :disabled="existEmptyTask", placeholder="セクションを選択", size="mini", clearable)
        el-option(v-for="section in sectionList", :key="section.id", :label="section.label", :value="section.id")
      el-tag.ml-100(v-if="existEmptyTask", size="small", type="danger", effect="plain") 空のタスクが存在します
    .mb-500
      el-button(@click="addSection", icon="el-icon-plus", size="mini") セクションを追加
</template>

<script>
export default {
  props: {
    sectionList: Array,
    activeSections: Array,
    tableData: Object
  },
  data () {
    return {
      selectedSectionValue: ''
    }
  },
  computed: {
    existEmptyTask () {
      const tableDataKeysArray = Object.keys(this.tableData)
      const allTasks = tableDataKeysArray.map((key) => {
        console.log(this.tableData[key])
        return this.tableData[key]
      })
      return true
    }
  },
  methods: {
    addTask () {
      if (this.selectedSectionValue === '') {
        this.tableData.notSectioned.push({
          id: this.tableData.totalNumber + 1,
          name: '',
          person: '',
          deadline: '',
          tag: '',
          other: ''
        })
      } else {
        this.tableData[this.selectedSectionValue].push({
          id: this.tableData.totalNumber + 1,
          name: '',
          person: '',
          deadline: '',
          tag: '',
          other: ''
        })
      }
      this.tableData.totalNumber += 1
      this.selectedSectionValue = ''
    },
    addSection () {
      const sectionNumber = this.sectionList.length + 1
      this.sectionList.push({
        id: sectionNumber,
        label: 'セクション' + sectionNumber,
        value: 'section' + sectionNumber
      })
      this.activeSections.push(sectionNumber)
    }
  }
}
</script>
