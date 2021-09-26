<template>
  <div class="save-game-management">
    <h1>Local Contacts</h1>
    <p>Ordered linearly by access time</p>
    <p>Process or erradicate existing contacts from the system.</p>
    <ul>
      <li v-for="savefile in savefiles" :key="savefile.filepath">
        <div class="name-label">{{ savefile.name }}</div>
        <div class="date-label">{{ formatDate(savefile.fileinfo.mtime) }}</div>
        <div class="delete-label" v-on:click="deleteContact(savefile.name)">[delete]</div>
      </li>
    </ul>
    <p>
      <router-link to="/universe">&lt; Back</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'SaveGameManagement',
  data: () => {
    return {
      files: [{ name: 'No contacts', fileinfo: { mtime: new Date() }, filepath: '/' }]
    }
  },
  computed: {
    electron() {
      return window.electron
    },
    savefiles() {
      console.log('Save files', this.files)
      const userSaveFiles = this.files
        .filter(file => file.filepath.includes('/savedata/'))
        .filter(file => !file.filepath.includes('userPreferences.json'))

      return userSaveFiles.map(file => {
        file.name = file.filepath
          .replace('/savedata/', '')
          .replace('.json', '')
        return file
      }).sort((a, b) => {
        const mtimea = Date.parse(a.fileinfo.mtime)
        const mtimeb = Date.parse(b.fileinfo.mtime)
        return mtimeb - mtimea
      })
    }
  },
  methods: {
    async deleteContact(key) {
      await electron.clearData(key)
      return this.findContacts()
    },
    async findContacts() {
      this.files = await this.electron.findFiles('**/*')
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
li:hover > div:hover {
  background: #633;
}
li > div.name-label {
  text-align: left;
  flex: 1 1;
  margin-right: 4px;
  text-transform: uppercase;
}
</style>
