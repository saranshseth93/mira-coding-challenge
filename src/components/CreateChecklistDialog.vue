<template>
  <q-dialog
    v-model="dialogOpen"
    no-backdrop-dismiss
  >
    <q-card v-if="checklist" style="max-width: 400px; width: 100%;">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          Create Checklist
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-input
          v-model="checklist.title"
          outlined
          stack-label
          label="Title"
        />
      </q-card-section>

      <ChecklistOptions v-model="checklist.value" />

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="black" v-close-popup />
        <q-btn label="Save" color="green-8" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ChecklistOptions from 'components/listItemTypes/checklist/ChecklistOptions.vue'

function defaultChecklistPayload () {
  return {
    type: 'checklist',
    title: null,
    created_at: null,
    value: []
  }
}

export default {
  components: { ChecklistOptions },
  data () {
    return {
      dialogOpen: false,
      checklist: null
    }
  },
  methods: {
    open () {
      this.checklist = defaultChecklistPayload()
      this.dialogOpen = true
    },
    close () {
      this.dialogOpen = false
      this.checklist = null
    },
    save () {
      this.$store.commit('listStore/addListItem', this.checklist)
      this.close()
    }
  }
}
</script>
