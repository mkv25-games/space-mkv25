<template>
  <div class="debug">
    <h1>Debug Tools</h1>
    <p>
      <button v-on:click="$store.dispatch('hideDeveloperTools')" v-if="$store.state.userPreferences.developerTools.visible">Hide Developer Tools</button>
      <button v-on:click="$store.dispatch('showDeveloperTools')" v-else>Show Developer Tools</button>
    </p>
    <p>
      <button v-on:click="$store.dispatch('loadUserPreferences')">Reload User Preferences</button>
    </p>
    <p>
      <router-link to="/debug/component-tests">Component Tests</router-link>
    </p>
    <p>
      <router-link to="/settings">&lt; Back</router-link>
    </p>
  </div>
</template>
