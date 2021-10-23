<template>
  <div class="settings-view">
    <SettingsNav />
    <div class="frame">
      <slot>
        <h1>Interface Settings</h1>
        <p>Build Information: {{ $store.state.version }}</p>
        <p>Stored count: {{ $store.state.userPreferences.count }}</p>
        <h2>Interactions</h2>
        <p>
          <button v-on:click="$store.dispatch('increment')">Increment</button>
        </p>
        <p>
          <button v-on:click="$store.dispatch('resetUserPreferences')">Reset User Preferences</button>
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
import SettingsNav from './ui/SettingsNav.vue'

export default {
  components: {
    SettingsNav
  }
}
</script>

<style scoped>
.settings-view {
  display: flex;
  align-items: stretch;
}
.frame {
  flex: auto;
  overflow: hidden;
}
</style>
