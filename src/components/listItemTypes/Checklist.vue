<template>
  <ListItemWrapper card-class="checklist" @delete="$emit('delete')">
    <template #title>
      {{ checklist.title }}
    </template>

    <ChecklistOptions v-model="checklist.value" />

    <template #date>
      {{ formattedDate }}
    </template>

    <template #footer>
      <q-item-label>
        {{ doneItemsAmount }} / {{ checklist.value.length }} done
      </q-item-label>
    </template>
  </ListItemWrapper>
</template>

<script>
import ListItemWrapper from 'components/ListItemWrapper.vue'
import ChecklistOptions from 'components/listItemTypes/checklist/ChecklistOptions.vue'
import moment from 'moment'

export default {
  components: {
    ListItemWrapper, ChecklistOptions
  },
  props: {
    checklist: {
      type: Object,
      required: true
    }
  },
  emits: ['delete'],
  watch: {
    'checklist.value': {
      deep: true,
      handler(newValue) {
        this.updateChecklistValue(newValue)
      }
    }
  },
  methods: {
    updateChecklistValue(newValue) {
      // Directly commit to Vuex; this method seems correctly set up
      this.$store.commit('listStore/updateListItemLabel', { uuid: this.checklist.uuid, value: newValue })
    }
  },
  computed: {
    doneItemsAmount() {
      const doneItems = this.checklist.value.filter(item => item.done)
      return doneItems.length
    },
    formattedDate() {
      return moment(this.checklist.created_at).format('Do MMM YYYY, h:mm a')
    }
  }
}
</script>
