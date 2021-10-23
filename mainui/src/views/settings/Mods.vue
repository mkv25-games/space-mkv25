<template>
  <Settings class="mods">
    <div class="mods">
      <h3>List of mods go here</h3>
      <div class="modpack">
        <property label="Modpack" v-for="modpack in modpacks" :key="modpack">{{ modpack }}</property>
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
      return this.$store.state.modpacks || ['stub']
    }
  }
}
</script>
