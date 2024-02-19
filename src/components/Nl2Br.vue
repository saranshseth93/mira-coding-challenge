<template>
  <component :is="tag" class="whitespace-preline">{{ text }}</component> <!-- eslint-disable-line vue/singleline-html-element-content-newline -->
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>
