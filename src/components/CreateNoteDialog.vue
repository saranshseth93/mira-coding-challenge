<template>
  <q-dialog v-model="dialogOpen" no-backdrop-dismiss>
    <q-card style="max-width: 400px; width: 100%;">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          Create Note
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <q-input v-model="note.title" outlined stack-label label="Title" style="margin-bottom: 10px;" />
        <q-input v-model="note.value" outlined stack-label label="Content" type="textarea" autogrow />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="black" v-close-popup @click="close" />
        <q-btn label="Save" color="green-8" @click="save" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
function defaultNotePayload() {
  return {
    type: 'note',
    title: null,
    value: null,
    created_at: new Date().toISOString()
  }
}

export default {
  data() {
    return {
      dialogOpen: false,
      note: null
    }
  },
  methods: {
    open() {
      this.note = defaultNotePayload()
      this.dialogOpen = true
    },
    close() {
      this.dialogOpen = false
      this.note = null
    },
    save() {
      this.$store.commit('listStore/addListItem', this.note)
      this.close()
    }
  }
}
</script>
