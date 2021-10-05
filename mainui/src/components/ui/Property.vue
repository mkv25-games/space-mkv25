<template>
  <span class="property">
    <label class="label">{{ label }}</label>
    <label class="value"><slot>{{ value }}</slot></label>
  </span>
</template>

<script>
export default {
  props: {
    label: String,
    value: String
  }
}
</script>

<style scoped>
span.property {
  display: flex;
  margin-right: 0.5em;
}
label.label {
  flex: auto;
  margin-right: 0.5em;
}
label.value {
  flex: auto;
}
</style>
