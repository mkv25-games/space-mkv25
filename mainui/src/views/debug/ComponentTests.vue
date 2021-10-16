<template>
  <div class="grid-icons">
    <h1>Component Tests</h1>
    <h2>Story Teller</h2>
    <StoryTeller />
    <h2>Horizontal Tile Grid</h2>
    <HorizontalTileGrid :tiles="iconTiles" :columns="20" :rows="14" :tileWidth="40" :tileHeight="60" style="font-size: 1.5em;" />
    <h2>Vertical Tile Grid</h2>
    <VerticalTileGrid :tiles="iconTiles" :columns="4" :rows="6" :tileWidth="135" :tileHeight="60" style="font-size: 2em;" />
  </div>
</template>

<script>
import HorizontalTileGrid from '@/components/ui/HorizontalTileGrid.vue'
import VerticalTileGrid from '@/components/ui/VerticalTileGrid.vue'
import StoryTeller from '@/components/toys/StoryTeller.vue'
import icons from '@/models/icons'

export default {
  components: { HorizontalTileGrid, VerticalTileGrid, StoryTeller },
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
}
</style>
