<template>
  <div class="settings">
    <h1>This is the settings page</h1>
    <p>Store Count: {{ $store.state.count }}</p>
    <button v-on:click="$store.dispatch('increment')">Increment</button>
  </div>
</template>
