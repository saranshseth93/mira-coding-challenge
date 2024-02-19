<template>
  <q-item dense>
    <q-item-section side>
      <q-checkbox :model-value="line.done" dense @update:model-value="$emit('update:done', $event)" />
    </q-item-section>
    <q-item-section>
      <q-input :model-value="line.label" :class="{ 'strikethrough': line.done }" dense autogrow borderless
        placeholder="Add value..." @update:model-value="$emit('update:label', $event)" />
    </q-item-section>
    <q-item-section side>
      <q-btn text-color="red" size="sm" icon="close" dense flat round @click="deleteLine" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    line: {
      type: Object,
      required: true
    }
  },
  emits: ['update:done', 'update:label', 'delete'],
  methods: {
    deleteLine() {
      this.$emit('delete')
    }
  }
}
</script>
<style>
.strikethrough {
  text-decoration: line-through;
  color: grey;
}
</style>
