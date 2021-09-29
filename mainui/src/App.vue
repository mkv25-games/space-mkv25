<template>
  <div class="app-frame">
    <primary-nav class="primary-nav" />
    <router-view class="router-view" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PrimaryNav from '@/components/PrimaryNav.vue'

export default defineComponent({
  components: {
    PrimaryNav
  },
  mounted () {
    this.$store.dispatch('loadUserPreferences')
    this.$store.dispatch('getVersion')
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
#mainui-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
}

.app-frame {
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  height: 100%;
}
.router-view {
  flex: auto;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
