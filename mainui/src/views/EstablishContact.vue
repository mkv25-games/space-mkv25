<template>
  <div class="template">
    <h1>Establish Contact</h1>
    <p>Forming phase dialect with extrapolated constraints:</p>
    <div class="form">
      <div class="form-row">
        <label>Contact Name:</label>
        <input v-model="filename" placeholder="New contact" />
      </div>
      <p class="actions">
        <router-link to="/universe">Cancel</router-link>
        <button>Connect</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveGameManagement',
  data: () => {
    return {
      filename: ''
    }
  }
}
</script>

<style scoped>
input {
  padding: 8px;
}
div.form {
  display: inline-block;
  min-width: 500px;
}
div.form-row {
  display: flex;
  align-items: center;
}
div.form-row > label {
  flex: 1 1;
  text-align: right;
  margin: 0.5em;
}
div.form-row > input {
  flex: 1 1;
}
p.actions {
  display: flex;
  justify-content: center;
}
p.actions > * {
  flex: 0 1;
  margin: 0.5em;
}
</style>