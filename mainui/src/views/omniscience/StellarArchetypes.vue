<template>
  <omniscience class="stellar-archetypes">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <svg viewBox="-500 -500 1000 1000" width="1000" height="1000" style="position: absolute; left: 0; right: 0;">
            <orbit :symbolSize="1" :radius="0" symbolColor="#fff7c8" orbitColor="#fff7c8" label="Sol" />
            <orbit :symbolSize="1" :radius="3" symbolColor="#b1adad" orbitColor="#b1adad" label="Mercury" />
            <orbit :symbolSize="1" :radius="6" symbolColor="#e3bb76" orbitColor="#e3bb76" label="Venus" />
            <orbit :symbolSize="1" :radius="8" symbolColor="#6b93d6" orbitColor="#6b93d6" label="Earth" />
            <orbit :symbolSize="1" :radius="13" symbolColor="#c1440e" orbitColor="#c1440e" label="Mars" />
            <orbit :symbolSize="1" :radius="43" symbolColor="#a59186" orbitColor="#a59186" label="Jupiter" />
            <orbit :symbolSize="1" :radius="79" symbolColor="#f4a15c" orbitColor="#f4a15c" label="Saturn" />
            <orbit :symbolSize="1" :radius="160" symbolColor="#62aee7" orbitColor="#62aee7" label="Uranus" />
            <orbit :symbolSize="1" :radius="250" symbolColor="#74d6fd" orbitColor="#74d6fd" label="Neptune" />
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
      highlightedStellarArchetype: {}
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
