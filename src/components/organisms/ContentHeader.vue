<template lang="pug">
  div
    span.add-action-space
      el-button(@click="addSection", icon="el-icon-plus", size="mini") セクションを追加
      el-button.ml-100(@click="addTask", :disabled="existEmptyTask", icon="el-icon-plus", size="mini") タスクを追加
      el-select.ml-100(v-model="selectedSectionValue", :disabled="existEmptyTask", placeholder="セクションを選択", size="mini", clearable)
        el-option(v-for="section in sections", :key="section.id", :label="section.label | truncate(15)", :value="section.keyName")
      el-tag.ml-100(v-if="existEmptyTask", size="small", type="danger", effect="plain") 空のタスクが存在します
    span.edit-action-space
      el-dropdown(trigger="click", @command="openFieldModal")
        span(class="el-dropdown-link")
          el-button(icon="el-icon-notebook-2", size="mini") フィールドを編集
        el-dropdown-menu(slot="dropdown")
          draggable(v-model="rearrangedColumnns")
            .field-item.px-100(v-for="column in columns", v-if="column.id !== 1")
              j-icon-button.mx-200(genre="fas", value="grip-vertical", type="grab")
              el-dropdown-item(:command="column").column-label {{ column.label | truncate }}
              j-switch.mx-200(v-model="column.visible")
            hr.my-100
            .field-item
              el-button(@click="addField", icon="el-icon-plus", size="mini", type="text") フィールドを追加
    j-modal(v-if="visibleFieldModal", @closeModal="closeFieldModal")
      template(v-slot:header)
        .fw-bold 「{{ selectedField.label | truncate }}」フィールドの編集
        j-icon-button.ml-a(genre="far", value="trash-alt", @click="deleteField")
      template
        .field-item.py-100
          .column-label フィールド名
          el-input(v-model="selectedField.label")
        .field-item.py-100
          .column-label フィールドの幅(px)
          el-input(v-model.number="selectedField.width")
        .field-item.py-100
          .column-label フィールドタイプ
          el-input(v-model="selectedField.typeLabel", disabled)
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    sections: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    taskTotalNumber: {
      type: Number,
      default: 0
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      selectedSectionValue: '',
      visibleFieldModal: false,
      selectedField: {}
    }
  },
  computed: {
    existEmptyTask () {
      const tableDataKeysArray = Object.keys(this.tableData)
      const allTasks = tableDataKeysArray.reduce((acc, key) => {
        return acc.concat(this.tableData[key])
      }, [])
      const emptyTasks = allTasks.filter((task) => {
        return task.name === ''
      })
      return emptyTasks.length > 0
    },
    rearrangedColumnns: {
      get () {
        return this.columns
      },
      set (newOrderColumns) {
        this.$emit('rearrangeColumns', newOrderColumns)
      }
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
        },
        subtasks: []
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
    },
    addField () {
      const emptyFieldId = this.columns.length + 1
      const emptyField = {
        id: emptyFieldId,
        deletedAt: '',
        label: '（未設定）',
        keyName: 'field' + emptyFieldId,
        typeLabel: '文字列',
        typeValue: 'string',
        width: 120,
        visible: true
      }
      this.openFieldModal(emptyField)
      this.$emit('addField', emptyField)
    },
    deleteField () {
      this.$emit('deleteField', this.selectedField.keyName)
      this.closeFieldModal()
    },
    openFieldModal (field) {
      this.selectedField = field
      this.visibleFieldModal = true
    },
    closeFieldModal () {
      this.visibleFieldModal = false
      this.selectedField = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-action-space {
    float: right;
  }
  .field-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .column-label {
    width: 100%;
  }
</style>
