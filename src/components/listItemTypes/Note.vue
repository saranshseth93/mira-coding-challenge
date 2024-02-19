<template>
  <ListItemWrapper card-class="note" @delete="$emit('delete')">
    <template #title>
      {{ note.title }}
    </template>

    <q-card-section class="q-pt-none">
      <nl2-br :text="note.value" />
    </q-card-section>

    <template #date>
      {{ formattedDate }}
    </template>
  </ListItemWrapper>
</template>

<script>
import ListItemWrapper from 'components/ListItemWrapper.vue'
import Nl2Br from 'components/Nl2Br.vue'
import moment from 'moment'

export default {
  components: {
    Nl2Br,
    ListItemWrapper
  },
  emits: ['delete'],
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return moment(this.note.created_at).format('Do MMM YYYY, h:mm a')
    }
  }
}
</script>
