<template>
  <q-page>
    <DropList :items="listItems" class="fit wrap q-col-gutter-md q-pa-md flex flex-md-row"
      @reorder="$event.apply(listItems)">
      <template #item="{ item, index }">
        <Note v-if="item.type === 'note'" :note="item" :key="`note-${item.uuid}`" @delete="deleteListItem(index)" />
        <Checklist v-else-if="item.type === 'checklist'" :checklist="item" :key="`checklist-${item.uuid}`"
          @delete="deleteListItem(index)" />
      </template>

      <template #feedback />
    </DropList>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { DropList } from 'vue-easy-dnd'

import Note from 'components/listItemTypes/Note.vue'
import Checklist from 'components/listItemTypes/Checklist.vue'
import { useQuasar } from 'quasar'

// TODO - doesn't seem very responsive on mobile (minimum requirement is iPhone 6-sized screen 4.7 inches)

export default defineComponent({
  name: 'IndexPage',
  components: {
    DropList, Note, Checklist
  },
  computed: {
    listItems() {
      return this.$store.getters['listStore/getList']
    }
  },
  setup() {
    const $q = useQuasar()

    return {
      showNotif(message, color = 'red', icon = 'mdi-alert') {
        $q.notify({
          message,
          color,
          icon
        })
      }
    }
  },
  methods: {
    deleteListItem(itemUuid) {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Do you really want to delete this item?',
        persistent: true,
        ok: {
          label: 'Yes',
          flat: true
        },
        cancel: {
          label: 'No',
          flat: true
        }
      }).onOk(() => {
        // User confirmed the action
        this.showNotif('Note Deleted!', 'blue', 'mdi-check')
        this.$store.commit('listStore/removeListItem', itemUuid)
      }).onCancel(() => {
        // User dismissed the dialog
        this.showNotif('Cancelled', 'red', 'mdi-information')
      })
    }

  }
})
</script>
