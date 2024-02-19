<template>
  <q-list>
    <ChecklistLine v-for="(line, key) in modelValue" v-model:done="line.done" v-model:label="line.label" :key="key"
      :line="line" @delete="deleteLine(key)" />

    <q-item dense clickable @click="addLine" :class="{ 'disabled-item': itemCountExceeded }">
      <q-item-section side>
        <q-icon name="mdi-plus" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          Add Checklist Item
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import ChecklistLine from 'components/listItemTypes/checklist/ChecklistLine.vue'
import { useQuasar } from 'quasar'

function defaultChecklistLine() {
  return {
    done: false,
    label: null
  }
}

export default {
  props: {
    modelValue: {
      type: Array,
      required: true
    }
  },
  components: {
    ChecklistLine
  },
  emits: ['update:model-value'],
  setup() {
    const $q = useQuasar()

    return {
      showNotif(message, color = 'red') {
        $q.notify({
          message,
          color,
          icon: 'announcement'
        })
      }
    }
  },
  methods: {
    addLine() {
      if (this.itemCountExceeded) {
        this.showNotif('You can only have 10 items in a checklist')
        return
      }

      const arr = JSON.parse(JSON.stringify(this.modelValue))
      arr.push(defaultChecklistLine())
      this.$emit('update:model-value', arr)
      this.$store.commit('listStore/addListItem', defaultChecklistLine())
    },
    deleteLine(index) {
      const arr = JSON.parse(JSON.stringify(this.modelValue))
      arr.splice(index, 1)
      this.$emit('update:model-value', arr)
      this.$store.commit('listStore/removeListItem', index)
    },
    handleLabelUpdate(index, newLabel) {
      const itemToUpdate = this.modelValue[index]
      if (itemToUpdate) {
        this.$store.commit('listStore/updateListItemLabel', { uuid: itemToUpdate.uuid, label: newLabel })
      }
    }
  },
  computed: {
    itemCountExceeded() {
      return this.modelValue.length >= 10
    }
  }
}
</script>
<style>
.disabled-item {
  opacity: 0.6;
}
</style>
