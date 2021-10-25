<template>
  <div class="home cover-image">
    <div class="excerpt">
      <h1>Space : Infinite</h1>
      <p>A heartbeat, a conciousness, a thought; pondering.</p>
      <p>Gravitational waves pulsing; vibrating through the fabric of time and space; 
        folding back and force into a rolling susurration.</p>
      <p>...</p>
      <div v-if="$store.state.contactList.length > 0">
        <router-link to="/universe" draggable="false">A contact has been made <icon icon="angle-double-right" /></router-link>
      </div>
      <div v-else>
        <router-link to="/universe" draggable="false">A contact is waiting to be established.</router-link>
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
.home {
  display: flex;
  background-color: #222;
  justify-content: center;
  align-items: center;
}

h1 {
  color: white;
}

.excerpt {
  display: inline-block;
  width: 60%;
  padding: 20px 20px;
  border-left: 4px solid #eee;
  border-right: 4px solid #eee;
  background: rgba(34, 34, 34, 0.7);
  color: white;
  font-weight: 500;
}

.excerpt a {
  color: greenyellow;
  font-weight: 700;
  text-decoration: none;
  border-left: 4px solid greenyellow;
  border-right: 4px solid greenyellow;
  padding: 10px;
  border-radius: 10px;
  background: rgba(34, 34, 34, 0.7);
  transition: background 250ms, border 1s, padding 200ms ease-in-out;
  user-select: none;
}
.excerpt a:hover {
  color: lightskyblue;
  border-left: 4px solid lightpink;
  border-right: 4px solid lightpink;
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 40px;
}
.excerpt a:active {
  color: white;
  border-color: white;
  background: rgba(0, 0, 0, 0.9);
  padding: 10px;
}

.cover-image {
  background: url('../../public/assets/icon.png') no-repeat center center;
  background-size: contain;
}
</style>
