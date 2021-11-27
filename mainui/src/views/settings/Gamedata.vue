<template>
  <settings class="scroll">
    <div class="gamedata">
      <h2>Game Data</h2>
      <p>Sections: {{ summarise(gamedata).join(', ') }}</p>
      <div v-for="([datasetKey, items]) in datasets(gamedata)" :key="datasetKey" class="dataset">
        <h3>{{ datasetKey }}</h3>
        <tabulation :items="items" />
      </div>
    </div>
  </settings>
</template>

<script>
export default {
  async mounted () {
    await this.$store.dispatch('loadModpacks')
  },
  computed: {
    gamedata () {
      return this.$store.state.gamedata || []
    }
  },
  methods: {
    summarise(modpack) {
       return this.datasets(modpack)
        .map(([key, value]) => {
          return `${key} (${value.length})`
        })
    },
    datasets (gamedata) {
      return Object.entries(gamedata)
        .filter(([key, value]) => {
          return key !== 'package'
        })
    }
  }
}
</script>

<style scoped>
.gamedata {
  border-left: 0.2em solid #999;
  border-right: 0.2em solid #999;
  padding-bottom: 0.5em;
  margin: 0;
}
.gamedata > h2 {
  background: #AAA;
  color: white;
  padding: 0.2em;
  margin-top: 0;
}
</style>
