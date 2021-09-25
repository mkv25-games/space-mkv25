<template>
  <div class="universe">
    <h1>Universe</h1>

    <div class="column">
      <h2>Explore</h2>
      <p>Scout</p>
      <p>Ancients</p>
      <p>Omniscience</p>

      <h2>Expand</h2>
      <p>Continue [Contact Name]</p>
      <p>Establish Contact</p>
      <p><router-link to="/save-game-management">Recover Contact</router-link></p>
    </div>
    <div class="column">
      <h2>Exploit</h2>
      <p>Economy Planner</p>
      <p>Research Tree</p>
      <p>Tutorial</p>

      <h2>Exterminate</h2>
      <p>Combat Diagnostics</p>
      <p>Challenges</p>
      <p>Markers</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.column {
  vertical-align: top;
  display: inline-block;
  width: 48%;
}
</style>
