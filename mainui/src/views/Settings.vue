<template>
  <div class="settings">
    <h1>This is the settings page</h1>
    <p>Store Count: {{ $store.state.count }}</p>
    <button v-on:click="$store.dispatch('increment')">Increment</button>
    <button v-on:click="$store.dispatch('hideDeveloperTools')" v-if="$store.state.developerTools.visible">Hide Developer Tools</button>
    <button v-on:click="$store.dispatch('showDeveloperTools')" v-else>Show Developer Tools</button>
  </div>
</template>
