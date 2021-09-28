<template>
  <div class="tile-grid">
    <div class="scroll-up"></div>
    <div v-for="tile in tiles" :style="style(tile)" :key="tile.id" :title="tile.icon" class="tile-grid-item">
      <font-awesome-icon :icon="['fas', tile.icon]" />
    </div>
    <div class="scroll-down"></div>
  </div>
</template>

<script>
export default {
  name: 'TileGrid',
  props: {
    tiles: Array,
    columns: Number,
    rows: Number
  },
  methods: {
    style(tile) {
      return 'background: white;'
    }
  }
}
</script>

<style scoped>
.tile-grid {
  display: flex;
  flex-flow: row wrap;
  border: 2px solid red;
}

.scroll-up {
  width: 100%;
  flex: auto;
  height: 20px;
  border: 2px solid green;
}

.tile-grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: auto;
  min-width: 25%;
  max-width: 25%;
  height: 0;
  padding: 12.5% 0 12.5% 0;
  outline: 2px solid blue;
  outline-offset: -1px;
  font-size: 4em;
}

.scroll-down {
  width: 100%;
  flex: auto;
  height: 20px;
  border: 2px solid yellow;
}
</style>
