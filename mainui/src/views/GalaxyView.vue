<template>
  <div class="galaxy-view">
    <h1>Galaxy</h1>

    <h2>{{ contact.name }}</h2>
    <pre>{{ contact.lastUpdated }}</pre>

    <p>Solar Systems</p>
    <p>Story</p>
    <p>Known Lifeforms</p>
    <p>Statistics</p>
    <p>Planets</p>
    <p>Outposts</p>
    <p>Fleets</p>
    <p>Threats</p>
    <p>Intelligence</p>
    <p>Research</p>
  </div>
</template>

<script>
import newContact from '@/models/contact.js'

export default {
  name: 'SaveGameManagement',
  computed: {
    contact() {
      return this.$store.state.contact || newContact()
    }
  }
}
</script>