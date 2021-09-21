<template>
  <div class="settings">
    <h1>This is the settings page</h1>
    <p>Store Count: {{ $store.state.count }}</p>
    <h2>Interactions</h2>
    <p><button v-on:click="$store.dispatch('increment')">Increment</button></p>
    <p>
      <button v-on:click="$store.dispatch('hideDeveloperTools')" v-if="$store.state.developerTools.visible">Hide Developer Tools</button>
      <button v-on:click="$store.dispatch('showDeveloperTools')" v-else>Show Developer Tools</button>
    </p>
    <p>
      <button v-on:click="$store.dispatch('loadUserPreferences')">Load User Preferences</button>
    </p>
  </div>
</template>
