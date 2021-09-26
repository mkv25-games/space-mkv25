<template>
  <div class="contact-management">
    <h1>Local Contacts</h1>
    <p v-if="loading">Loading Contacts</p>
    <div v-else-if="contacts.length">
      <p>Contacts are ordered linearly by access time</p>
      <ul>
        <li v-for="contact in contacts" :key="contact.filepath">
          <div class="name-label" v-on:click="loadContact(contact)">{{ contact.name }}</div>
          <div class="date-label">{{ formatDate(contact.fileinfo.mtime) }}</div>
          <div class="delete-label" v-on:click="deleteContact(contact.name)">[delete]</div>
        </li>
      </ul>
      <p>You may optionally process or erradicate existing contacts from the system.</p>
    </div>
    <div v-else>
      <p>No contacts found.</p>
      <p>Consider: <router-link to="/establish-contact">Establish Contact</router-link></p>
    </div>
    <p>
      <router-link to="/universe">&lt; Back</router-link>
    </p>
    <div v-if="errors.length > 0" class="errors">
      <h2>Errors</h2>
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>

const exampleContacts = [{ name: 'Loading contacts', fileinfo: { mtime: new Date() }, filepath: '/' }]

export default {
  name: 'ContactManagement',
  data: () => {
    return {
      files: [],
      errors: [],
      loading: true
    }
  },
  computed: {
    electron() {
      return window.electron
    },
    contacts() {
      console.log('Save files', this.files)
      const userSaveFiles = this.files
        .filter(file => file.filepath.includes('/savedata/'))
        .filter(file => !file.filepath.includes('userPreferences.json'))

      const contacts = userSaveFiles.map(file => {
        file.name = file.filepath
          .replace('/savedata/', '')
          .replace('.json', '')
        return file
      }).sort((a, b) => {
        const mtimea = Date.parse(a.fileinfo.mtime)
        const mtimeb = Date.parse(b.fileinfo.mtime)
        return mtimeb - mtimea
      })

      return contacts
    }
  },
  methods: {
    async loadContact(savefile) {
      try {
        await this.$store.dispatch('loadContact', savefile)
        this.$router.push({ path: 'galaxy-view' })
      } catch (ex) {
        this.errors.push(`Unable to load contact ${savefile.filepath}.`)
      }
    },
    async deleteContact(key) {
      await electron.clearData(key)
      return this.findContacts()
    },
    async findContacts() {
      this.loading = true
      this.files = await this.electron.findFiles('**/*')
      this.loading = false
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const yyyymmdd = date.toISOString().substring(0, 10)
      const hhmm = date.toISOString().substring(11, 19)
      return [yyyymmdd, hhmm].join(' ')
    }
  },
  async mounted () {
    this.findContacts()
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  display: inline-block;
  min-width: 700px;
  border: 4px solid black;
  background: #555;
}
li {
  display: flex;
  margin: 4px;
  list-style: none;
  color: white;
}
li > div {
  padding: 4px;
  display: inline-block;
  cursor: pointer;
}
li:hover > div.name-label:hover {
  background: #444;
}
li:hover > div.delete-label:hover {
  background: #533;
}
li > div.name-label {
  text-align: left;
  flex: 1 1;
  margin-right: 4px;
  text-transform: uppercase;
}
</style>
