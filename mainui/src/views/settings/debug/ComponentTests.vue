<template>
  <settings class="component-tests">
    <div class="grid-icons">
      <h1>Component Tests</h1>
      <h2>Story Teller</h2>
      <story-teller />
      <h2>Horizontal Tile Grid</h2>
      <horizontal-tile-grid :tiles="iconTiles" :columns="20" :rows="14" :tileWidth="40" :tileHeight="60" style="font-size: 1.5em;" />
      <h2>Vertical Tile Grid</h2>
      <vertical-tile-grid :tiles="iconTiles" :columns="4" :rows="6" :tileWidth="135" :tileHeight="60" style="font-size: 2em;" />
      <p>Total of {{ iconTiles.length }} icons.</p>
    </div>
  </settings>
</template>

<script>
import icons from '@/models/icons'

export default {
  computed: {
    iconTiles () {
      return icons().map((icon) => {
        return {
          id: icon,
          icon: icon
        }
      })
    }
  }
}
</script>

<style scoped>
.grid-icons {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}
</style>
