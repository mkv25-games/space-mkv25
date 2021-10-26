<template>
  <div>
    <div class="region info" v-for="region in regions" :key="region.id">
      <icon icon="expand" :style="`color: ${region.color}`" />
      <span>{{ region.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    regions: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
.region.info {
  text-align: left;
  background: #222;
  color: white;
  padding: 0.2em;
  margin: 0.1em 0;
  vertical-align: middle;
  cursor: pointer;
}
.region.info:hover {
  background: #111;
  transition: background 250ms ease-in-out;
}
</style>