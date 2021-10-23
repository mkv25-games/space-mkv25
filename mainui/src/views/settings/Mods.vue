<template>
  <Settings class="mods">
    <div class="mods">
      <h3>Mod List</h3>
      <div class="modpack">
        <property :label="modpack.packdata.package || 'No package info'" v-for="modpack in modpacks" :key="modpack"><b>Keys: {{ Object.keys(modpack.packdata).join(', ') }}</b></property>
      </div>
    </div>
  </Settings>
</template>

<script>
import Settings from './Settings.vue'
import Property from '@/components/ui/Property'

export default {
  components: {
    Settings, Property
  },
  async mounted() {
    await this.$store.dispatch('updateModpackList')
  },
  computed: {
    modpacks() {
      return this.$store.state.modpacks || []
    }
  }
}
</script>
