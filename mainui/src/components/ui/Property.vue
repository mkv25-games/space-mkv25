<template>
  <span class="property">
    <span class="label">{{ label }}</span>
    <span class="value">
      <span class="va"><slot>{{ value }}</slot></span>
    </span>
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

<style>
span.property {
  display: flex;
  margin: 0 -1px -1px 0;
  align-items: stretch;
  justify-content: left;

  outline: 1px solid #666;
  outline-offset: -1px;
}
span.property > span.label {
  flex: auto;
  margin: 0.2em 0.5em 0.2em 0.5em;
  font-weight: bold;
  text-align: left;
}
span.property > span.value {
  display: flex;
  padding: 0 0.5em;
  justify-content: flex-end;
  align-items: stretch;
  flex: auto;
  font-weight: bold;
  text-align: right;
  background: #EEE;
}
span.property > span.value > span.va {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
}

span.property > span.value > span.va > input {
  display: inline-block;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  text-align: right;
  background: #EEE;
  min-width: 60px;
}
</style>
