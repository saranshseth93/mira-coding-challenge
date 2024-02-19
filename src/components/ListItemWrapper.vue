<template>
  <Drag class="col-3 equal-width" handle=".drag-handle" @dragstart="isDragging = true" @dragend="isDragging = false">
    <q-card class="list-item full-height flex column" :class="[{ 'dragging': isDragging }, cardClass]">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bolder">
          <slot name="title" />
        </q-toolbar-title>

        <q-btn class="drag-handle" icon="mdi-drag" flat dense round>
          <q-tooltip>Drag Card</q-tooltip>
        </q-btn>

        <q-btn class="q-ml-sm" icon="mdi-dots-vertical" flat dense round>
          <q-menu>
            <q-card style="min-width: 150px;">
              <q-list padding>
                <q-item dense clickable v-close-popup @click="$emit('delete')">
                  <q-item-section side>
                    <q-icon name="mdi-trash-can" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-bold text-red-7">
                      Delete
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <div style="flex: 1 1 auto;">
        <slot />
      </div>

      <q-toolbar>
        <slot name="footer" />

        <q-space />

        <q-item-label class="text-right" caption>
          <slot name="date" />
        </q-item-label>
      </q-toolbar>
    </q-card>
  </Drag>
</template>

<script>
import { Drag } from 'vue-easy-dnd'

export default {
  props: {
    cardClass: {
      type: [String, Object]
    }
  },
  components: {
    Drag
  },
  emits: ['delete'],
  data() {
    return {
      isDragging: false
    }
  }
}
</script>
<style>
.equal-width {
  flex: 0 0 25%;
  max-width: 25%;
}

@media screen and (max-width: 600px) {
  .equal-width {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
