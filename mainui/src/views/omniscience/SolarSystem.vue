<template>
  <omniscience class="solar-system">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <svg viewBox="-500 -500 1000 1000" width="1000" height="1000" style="position: absolute; left: 0; right: 0;">
            <orbit v-for="so in stellarObjects" :symbolSize="1" :radius="so.orbit" :symbolColor="so.color" :orbitColor="so.color" :label="so.name"  :key="so.name" />
            <orbit v-if="hso" :symbolSize="5" :radius="hso.orbit" :symbolColor="hso.color" :orbitColor="hso.color" :label="hso.name" />
          </svg>
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <property-panel :item="highlightedStellarObject" :rows="8" />
        <h2>Solar System</h2>
        <vertical-tile-grid :tiles="sortStellarObjects(stellarObjects)" :columns="1" :rows="10" :tileWidth="300" :tileHeight="30">
          <template v-slot:default="{ tile }">
            <div class="solar system info" v-on:mouseover="highlightedStellarObject = tile">
              <icon :icon="tile.icon || 'circle'" :style="`color: ${tile.color}`" />
              <span>{{ tile.name }} - {{ tile.orbit }} lm</span>
            </div>
          </template>
        </vertical-tile-grid>
      </template>
    </column-layout>
  </omniscience>
</template>

<script>

const stellarObjects = [{
  name: 'Sol',
  size: 1,
  orbit: 0,
  color: '#fff7c8'
}, {
  name: 'Mercury',
  size: 1,
  orbit: 3,
  color: '#b1adad'
}, {
  name: 'Venus',
  size: 1,
  orbit: 6,
  color: '#e3bb76'
}, {
  name: 'Earth',
  size: 1,
  orbit: 8,
  color: '#6b93d6'
}, {
  name: 'Mars',
  size: 1,
  orbit: 13,
  color: '#c1440e'
}, {
  name: 'Jupiter',
  size: 1,
  orbit: 43,
  color: '#a59186'
}, {
  name: 'Saturn',
  size: 1,
  orbit: 79,
  color: '#f4a15c'
}, {
  name: 'Uranus',
  size: 1,
  orbit: 160,
  color: '#62aee7'
}, {
  name: 'Neptune',
  size: 1,
  orbit: 250,
  color: '#74d6fd'
}]

export default {
  data() {
    return {
      highlightedStellarObject: {}
    }
  },
  computed: {
    stellarObjects() {
      return stellarObjects || []
    },
    hso() {
      return this.highlightedStellarObject
    }
  },
  methods: {
    sortStellarObjects(archetypes) {
      return archetypes.sort((a, b) => {
        return a.orbit < b.orbit 
      })
    },
  }
}
</script>

<style scoped>
.solar.system.info {
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
.solar.system.info:hover {
  background: #111;
  transition: background 250ms ease-in-out;
}
</style>
