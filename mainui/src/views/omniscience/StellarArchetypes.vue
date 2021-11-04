<template>
  <omniscience class="stellar-archetypes">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <svg viewBox="-500 -500 1000 1000" width="1000" height="1000" style="position: absolute; left: 0; right: 0;">
            <circle cx="0" cy="0" r="200" fill="transparent" stroke="orange" stroke-width="2" opacity="0.5" />
            <circle cx="-200" cy="0" r="10" fill="orange" />
            <circle cx="0" cy="0" r="60" fill="transparent" stroke="white" stroke-width="2" opacity="0.5" />
            <circle cx="60" cy="0" r="15" fill="white" />
            <circle cx="0" cy="0" r="20" fill="transparent" stroke="grey" stroke-width="4" opacity="0.5" />
            <circle cx="0" cy="0" r="20" fill="black" />
          </svg>
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <property-panel :item="highlightedStellarArchetype" :rows="8" />
        <h2>Stellar Archetypes</h2>
        <vertical-tile-grid :tiles="sortArchetypes(stellarArchetypes)" :columns="1" :rows="10" :tileWidth="300" :tileHeight="30">
          <template v-slot:default="{ tile }">
            <div class="stellar archetype info" v-on:mouseover="highlightedStellarArchetype = tile">
              <icon :icon="tile.icon || 'circle'" :style="`color: ${tile.color}`" />
              <span>{{ tile.label }}</span>
            </div>
          </template>
        </vertical-tile-grid>
      </template>
    </column-layout>
  </omniscience>
</template>

<script>

export default {
  data() {
    return {
      highlightedStellarArchetype: false
    }
  },
  computed: {
    stellarArchetypes() {
      return this.$store.state.allStellarArchetypes || []
    }
  },
  methods: {
    limitNumber(num) {
      return Number.parseFloat(num.toFixed(3))
    },
    sortArchetypes(archetypes) {
      return archetypes.sort((a, b) => {
        return a.label.localeCompare(b.label)
      })
    },
  }
}
</script>

<style scoped>
.stellar.archetype.info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  background: #222;
  color: white;
  vertical-align: middle;
  cursor: pointer;
  height: 100%;
}
.stellar.archetype.info:hover {
  background: #111;
  transition: background 250ms ease-in-out;
}
</style>
