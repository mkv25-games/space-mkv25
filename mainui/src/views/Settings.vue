<template>
  <div class="settings">
    <h1>Interface Settings</h1>
    <p>Build Information: {{ $store.state.version }}</p>
    <h2>Interactions</h2>
    <p>
      <button v-on:click="$store.dispatch('increment')">Increment</button>
    </p>
    <p>Stored count: {{ $store.state.count }}</p>
    <h2>Debug Tools</h2>
    <p>
      <button v-on:click="$store.dispatch('hideDeveloperTools')" v-if="$store.state.developerTools.visible">Hide Developer Tools</button>
      <button v-on:click="$store.dispatch('showDeveloperTools')" v-else>Show Developer Tools</button>
    </p>
    <p>
      <button v-on:click="$store.dispatch('loadUserPreferences')">Reload User Preferences</button>
    </p>
    <p>
      <button v-on:click="$store.dispatch('resetUserPreferences')">Reset User Preferences</button>
    </p>
  </div>
</template>
