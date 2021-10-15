<template>
  <div class="settings">
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
    <router-link to="/debug">Debug Tools</router-link>
  </div>
</template>
