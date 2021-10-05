<template>
  <div class="galaxy-view">
    <GalaxyNav />
    <div class="frame">
      <slot>
        <column-layout>
          <template v-slot:left>
            <galaxy-svg :galaxy="galaxy" :tileSize="tileSize" v-on:quadrantHover="showQuadrantInfo" />
            <quadrant-breakdown :galaxy="galaxy" />
          </template>
          <template v-slot:right>
            <h2>{{ contact.name }}</h2>
            <pre>{{ contact.lastUpdated }}</pre>
            <galaxy-inputs v-on:inputsChanged="regenerateGalaxy" />
            <p>
              <label>Tile Size:</label>
              <input v-model="tileSize" type="number" min="5" max="50">
            </p>
            <highlighted-quadrant-info :quadrant="highlightedQuadrant" />
          </template>
        </column-layout>
      </slot>
    </div>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'
import GalaxyNav from '@/components/GalaxyNav.vue'
import ColumnLayout from '@/components/ui/ColumnLayout.vue'
import HighlightedQuadrantInfo from '@/components/ui/HighlightedQuadrantInfo.vue'
import QuadrantBreakdown from '@/components/ui/QuadrantBreakdown.vue'
import GalaxyInputs from '@/components/ui/GalaxyInputs.vue'
import GalaxySvg from '@/components/ui/GalaxySVG.vue'

export default {
  components: { GalaxyNav, ColumnLayout, HighlightedQuadrantInfo, QuadrantBreakdown, GalaxyInputs, GalaxySvg },
  data() {
    return {
      highlightedQuadrant: false,
      overrideGalaxy: false,
      tileSize: 40
    }
  },
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxy() {
      return this.overrideGalaxy || this.$store.state.galaxy || newGalaxy()
    },
  }, 
  methods: {
    showQuadrantInfo(quadrant) {
      this.highlightedQuadrant = quadrant
    },
    regenerateGalaxy(properties) {
      this.overrideGalaxy = newGalaxy(properties)
    }
  },
}
</script>

<style scoped>
.galaxy-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow-y: scroll;
}

</style>