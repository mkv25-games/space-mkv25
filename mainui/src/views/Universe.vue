<template>
  <div class="universe">
    <h1>Universe</h1>

    <div class="column">
      <h2>Explore</h2>
      <p>Scout</p>
      <p>Ancients</p>
      <p><router-link to="/omniscience/home">Omniscience</router-link></p>

      <h2>Expand</h2>
      <p>
        <a v-if="lastContact" v-on:click="reestablishContact(lastContact)">Continue <b>{{ lastContact.name }}</b></a>
        <span v-else class="disabled-link">[Communications Error]</span>
      </p>
      <p><router-link to="/establish-contact">Establish Contact</router-link></p>
      <p>
        <router-link v-if="contactList.length > 0" to="/contact-management">Recover Contact</router-link>
        <span v-else class="disabled-link">Recover Contact</span>
      </p>
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

<script>
import listContacts from '@/formatting/listContacts'

export default {
  name: 'Universe',
  async mounted() {
    await this.$store.dispatch('refreshContactList')
  },
  computed: {
    contactList() {
      return this.$store.state.contactList
    },
    lastContact() {
      return listContacts(this.contactList)[0] || false
    }
  },
  methods: {
    async reestablishContact(contact) {
      await this.$store.dispatch('loadContact', contact)
      this.$router.push({ path: 'galaxy-view' })
    }
  }
}
</script>

<style lang="css" scoped>
.column {
  vertical-align: top;
  display: inline-block;
  width: 48%;
}
.disabled-link {
  opacity: 0.4;
  cursor:default;
}
a {
  color: purple;
  text-decoration: none;
  cursor: pointer;
}
a:hover {
  color: purple;
  text-shadow: 2px 2px rgb(50, 20, 20, 0.2);
}
</style>
