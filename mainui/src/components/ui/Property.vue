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
span.property.borderless {
  outline: none;
  outline-offset: 0;
}
span.property > span.label {
  flex: 2 3;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.2em 0.5em 0.2em 0.5em;
  font-weight: bold;
  text-align: left;
  user-select: none;
  white-space: nowrap;
}
span.property > span.value {
  flex: 3 4;
  display: flex;
  padding: 0 0.5em;
  justify-content: flex-end;
  align-items: stretch;
  font-weight: bold;
  text-align: right;
  background: #EEE;
  white-space: nowrap;
}
span.property > span.value:hover {
  background: #DDD;
}
span.property > span.value > span.va {
  flex: auto;
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
}
span.property > span.value > span.va > input {
  flex: auto;
  display: inline-block;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  text-align: right;
  background: inherit;
  min-width: 60px;
  font-size: 1em;
}
span.property > span.value > span.va > input:focus {
  outline: none;
}

.darkmode span.property > span.label {
  color: #eee;
}
.darkmode span.property > span.value {
  color: white;
  background: #111;
}
.darkmode span.property > span.value:hover {
  background: #333;
}
.darkmode span.property > span.value > span.va > input {
  background: #222;
  color: white;
}
</style>
