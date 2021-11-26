<template>
  <settings class="mods scroll">
    <div class="mods">
      <div class="modpack" v-for="modpack in modpacks" :key="modpack">
        <h2>{{ modpack.packdata.package || 'No package info' }}</h2>
        <p>Contents: {{ summarise(modpack).join(', ') }}</p>
        <div v-for="([datasetKey, items]) in datasets(modpack)" :key="datasetKey" class="dataset">
          <h3>{{ datasetKey }}</h3>
          <tabulation :items="items" />
        </div>
        <p v-if="modpack.messages.length">{{ modpack.messages }}</p>
      </div>
    </div>
  </settings>
</template>

<script>
import Tabulation from '../../components/ui/Tabulation.vue'
export default {
  components: { Tabulation },
  async mounted() {
    await this.$store.dispatch('loadModpacks')
  },
  computed: {
    modpacks() {
      return this.$store.state.modpacks || []
    }
  },
  methods: {
    summarise(modpack) {
       return this.datasets(modpack)
        .map(([key, value]) => {
          return `${key} (${value.length})`
        })
    },
    datasets(modpack) {
      return Object.entries(modpack.packdata)
        .filter(([key, value]) => {
          return key !== 'package'
        })
    }
  }
}
</script>
