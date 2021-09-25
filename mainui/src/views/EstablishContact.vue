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
        <button v-on:click="submitForm">Connect</button>
      </p>
      <div v-if="formErrors.length" class="form-errors">
        <h2>Contact Disconnects</h2>
        <p class="form-error" v-for="message in formErrors" :key="message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SaveGameManagement',
  data: () => {
    return {
      filename: '',
      formErrors: []
    }
  },
  methods: {
    validateForm() {
      this.formErrors = []
      this.filename ? false : this.formErrors.push('No contact name assigned')
    },
    submitForm() {
      return this.validateForm() ? this.createContact(this) : false
    },
    createContact(data) {
      console.log('Creating contact:', data.filename)
      return true
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