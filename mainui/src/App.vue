<template>
  <div class="app-frame">
    <primary-nav class="primary-nav" />
    <router-view class="router-view" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PrimaryNav from '@/components/PrimaryNav.vue'
import rpc from '@/api/rpc'

export default defineComponent({
  components: {
    PrimaryNav
  },
  mounted () {
    rpc.notify(window)
    this.$store.dispatch('getVersion')
    this.$store.dispatch('loadUserPreferences')
    this.$store.dispatch('refreshContactList')
    this.$store.dispatch('loadModpacks')
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
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 10px;
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

h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.4em;
    margin-block-end: 0.4em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
</style>
