<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold header">
          <q-img src="../assets/notepad.svg" spinner-color="white" style="width: 60px;" /> Notepad
          Project
        </q-toolbar-title>

        <q-btn icon="mdi-plus" round color="deep-orange" size="md">
          <q-tooltip>
            Create Item
          </q-tooltip>

          <q-menu>
            <q-card style="min-width: 200px;">
              <q-list padding>
                <q-item dense clickable v-close-popup @click="$refs.noteDialog.open()">
                  <q-item-section>
                    <q-item-label>
                      Create Note
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item dense clickable v-close-popup @click="$refs.checklistDialog.open()">
                  <q-item-section>
                    <q-item-label>
                      Create Checklist
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg">
      <router-view />
    </q-page-container>
  </q-layout>

  <CreateChecklistDialog ref="checklistDialog" />
  <CreateNoteDialog ref="noteDialog" />
</template>

<script>
import { defineComponent } from 'vue'

import CreateChecklistDialog from 'components/CreateChecklistDialog.vue'
import CreateNoteDialog from 'src/components/CreateNoteDialog.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    CreateChecklistDialog,
    CreateNoteDialog
  }
})
</script>

<style>
.bg {
  background-color: #f29e03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='46' height='46' fill-opacity='0.6' fill='%23ffa61d'/%3E%3C/svg%3E");
  height: 100vh;
}

.header {
  padding: 20px;
}
</style>
