<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="excerpt">
      <p>A heartbeat, a conciousness, a thought; pondering.</p>
      <p>Gravitational waves pulsing; vibrating through the fabric of time and space; 
        folding back and force into a rolling susurration.</p>
      <p>...</p>
      <router-link to="/universe">A contact has been made.</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTitle',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

.excerpt {
  display: inline-block;
  width: 60%;
  padding: 0 20px;
  border-left: 4px solid #eee;
  border-right: 4px solid #eee;
}

</style>
