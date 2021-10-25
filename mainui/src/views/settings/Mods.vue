<template>
  <settings class="mods">
    <div class="mods">
      <h3>Mod List</h3>
      <div class="modpack">
        <property :label="modpack.packdata.package || 'No package info'" v-for="modpack in modpacks" :key="modpack">
          <b>Keys: {{ Object.keys(modpack.packdata).join(', ') }}</b>
          <p v-if="modpack.messages.length">{{ modpack.messages }}</p>
        </property>
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
  }
}
</script>
