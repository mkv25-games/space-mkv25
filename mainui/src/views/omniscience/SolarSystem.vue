<template>
  <omniscience class="solar-system">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <template v-slot:default="{ zoom }">
            <svg viewBox="-500 -500 1000 1000" width="1000" height="1000" style="position: absolute; left: 0; right: 0;">
              <orbit v-for="so in stellarObjects" :symbolSize="1" :radius="parseConfValue(so.orbit.radius).quantity" :symbolColor="so.color" :orbitColor="so.color" :label="so.name"  :key="so.name" :highlighted="hso.name === so.name" :zoom="zoom" />
            </svg>
          </template>
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <property-panel :item="highlightedStellarObject" :rows="8" />
        <h2>Solar System</h2>
        <vertical-tile-grid :tiles="sortStellarObjects(stellarObjects)" :columns="1" :rows="10" :tileWidth="300" :tileHeight="30">
          <template v-slot:default="{ tile }">
            <div class="solar system info" v-on:mouseover="highlightedStellarObject = tile">
              <icon :icon="tile.icon || 'circle'" :style="`color: ${tile.color}`" />
              <span>{{ tile.name }} - {{ tile.orbit.radius }}</span>
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
      highlightedStellarObject: {}
    }
  },
  computed: {
    stellarObjects() {
      return this.$store.state.gamedata.Planet || []
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
    parseConfValue (value) {
      const [val, unit] = value.split(' ')
      const quantity = Number.parseFloat(val)
      return {
        quantity,
        unit
      }
    }
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
