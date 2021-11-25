<template>
  <settings class="mods">
    <div class="mods">
      <div class="modpack" v-for="modpack in modpacks" :key="modpack">
        <h3>{{ modpack.packdata.package || 'No package info' }}</h3>
        <p>Contents: {{ summarise(modpack).join(', ') }}</p>
        <p v-if="modpack.messages.length">{{ modpack.messages }}</p>
        <pre>{{ modpack.packdata.package }}</pre>
      </div>
    </div>
  </settings>
</template>

<script>
export default {
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
       return Object.entries(modpack.packdata)
        .filter(([key, value]) => {
          return key !== 'package'
        })
        .map(([key, value]) => {
          return `${key} (${value.length})`
        })
    }
  }
}
</script>
