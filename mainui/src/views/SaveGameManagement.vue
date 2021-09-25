<template>
  <div class="save-game-management">
    <h1>Local Contacts</h1>
    <p>Ordered linearly by access time</p>
    <p>Process or erradicate existing contacts from the system</p>
    <ul>
      <li v-for="savefile in savefiles" :key="savefile.filepath">
        <div class="load-label">{{ savefile.name }}</div>
        <div class="delete-label">[delete]</div>
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
      filepaths: ['No file']
    }
  },
  computed: {
    electron() {
      return window.electron
    },
    savefiles() {
      const userSaveFilepaths = this.filepaths
        .filter(filepath => filepath.includes('/savedata/'))
        .filter(filepath => !filepath.includes('userPreferences.json'))

      return userSaveFilepaths.map(filepath => {
        const name = filepath
          .replace('/savedata/', '')
          .replace('.json', '')
          .toUpperCase()
        return {
          filepath,
          name
        }
      })
    }
  },
  async mounted () {
    console.log('Mounted Save Game Management')
    this.filepaths = await this.electron.findFiles('**/*')
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  display: inline-block;
  min-width: 500px;
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
li > div.load-label {
  flex: 1 1;
  margin-right: 4px;
}
</style>
