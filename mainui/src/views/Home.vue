<template>
  <div class="home">
    <h1>Space : Infinite</h1>
    <p>
      <font-awesome-icon :icon="['fas', 'sun']" class="title-icon" />
      <font-awesome-icon :icon="['fas', 'infinity']" class="title-icon" />
      <font-awesome-icon :icon="['fas', 'virus']" class="title-icon" />
    </p>
    <div class="excerpt">
      <p>A heartbeat, a conciousness, a thought; pondering.</p>
      <p>Gravitational waves pulsing; vibrating through the fabric of time and space; 
        folding back and force into a rolling susurration.</p>
      <p>...</p>
      <div v-if="$store.state.contactList.length > 0">
        <router-link to="/universe">A contact has been made.</router-link>
      </div>
      <div v-else>
        <router-link to="/universe">A contact is waiting to be established.</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('refreshContactList')
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

.title-icon {
  font-size: 10em;
  margin: 0.1em;
  color: #222;
}

.excerpt {
  display: inline-block;
  width: 60%;
  padding: 0 20px;
  border-left: 4px solid #eee;
  border-right: 4px solid #eee;
}
</style>
