<template lang="pug">
  div
    .mb-100
      el-button(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus", size="mini") タスクを追加
      el-select.ml-100(v-model="selectedSectionId", :disabled="existEmptyTask", placeholder="セクションを選択", size="mini", clearable)
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
    tableData: Array
  },
  data () {
    return {
      selectedSectionId: ''
    }
  },
  computed: {
    existEmptyTask () {
      const lastTask = this.tableData[this.tableData.length - 1]
      return lastTask.name === ''
    }
  },
  methods: {
    addTask () {
      this.tableData.push({
        id: this.tableData.length + 1,
        section: this.selectedSectionId,
        name: '',
        person: '',
        deadline: '',
        tag: '',
        other: ''
      })
      this.selectedSectionId = ''
    },
    addSection () {
      const sectionNumber = this.sectionList.length + 1
      this.sectionList.push({
        id: sectionNumber,
        label: 'セクション' + sectionNumber
      })
      this.activeSections.push(sectionNumber)
    }
  }
}
</script>
