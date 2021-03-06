<template>
  <div class="template">
    <column-layout class="fixed-width-right overflow-hidden">
      <template v-slot:left>
        <pan-and-zoom class="darkmode">
          <GalaxySVG :galaxy="galaxy" :tileSize="40" v-on:quadrantHover="showQuadrantInfo" />
        </pan-and-zoom>
      </template>
      <template v-slot:right>
        <h1>Establish Contact</h1>
        <p>Forming phase dialect with extrapolated constraints:</p>
        <div class="form">
          <div class="form-row">
            <label>Contact Name:</label>
            <input v-model="filename" placeholder="New contact" />
          </div>
          <div v-if="formErrors.length" class="form-errors">
            <h2>Contact Disconnects</h2>
            <p class="form-error" v-for="message in formErrors" :key="message">{{ message }}</p>
          </div>
          <galaxy-inputs v-on:inputsChanged="regenerateGalaxy" />
          <p class="actions">
            <router-link to="/universe">Cancel</router-link>
            <button v-on:click="submitForm">Connect</button>
          </p>
          <region-types :regions="quadrantWithAnalysis.regions" />
        </div>
      </template>
    </column-layout>
  </div>
</template>

<script>
import newContact from '@/models/contact'
import newGalaxy from '@/models/galaxy'

export default {
  data: () => {
    return {
      filename: '',
      formErrors: [],
      highlightedQuadrant: null,
      overrideGalaxy: false
    }
  },
  computed: {
    electron() {
      return window.electron
    },
    contact() {
      return this.$store.state.contact || newContact()
    },
    galaxy() {
      return this.overrideGalaxy || this.$store.state.galaxy || newGalaxy()
    },
    regions() {
      return this.$store.state.allRegionTypes || []
    },
    quadrantWithAnalysis () {
      const quad = this.highlightedQuadrant || {}
      const quadrantData = {
        mass: quad.mass,
        density: quad.density,
        composition: quad.composition
      }

      quadrantData.regions = this.regions.filter(region => {
        const inDensity = quadrantData.density >= region.density.lower && quadrantData.density <= region.density.upper 
        const inMass = quadrantData.mass >= region.mass.lower && quadrantData.mass <= region.mass.upper 
        return inDensity && inMass
      })

      return quadrantData
    }
  },
  methods: {
    validateForm() {
      this.formErrors = []
      this.filename ? false : this.formErrors.push('No contact name assigned')

      return this.formErrors.length === 0
    },
    submitForm() {
      return this.validateForm() ? this.createContact(this) : false
    },
    async createContact(data) {
      console.log('Creating contact:', data.filename)
      let contact
      try {
        contact = newContact({ name: data.filename, galaxy: this.galaxy })
        await this.$store.dispatch('saveContact', contact)
        await this.$store.dispatch('loadContact', contact)
        this.$router.push({ path: '/galaxy/galaxy-view' })
      } catch (ex) {
        this.formErrors.push('Unable to create contact:', ex.message, contact)
        console.log('[EstablishContact.vue]', ex, 'Contact:', contact)
      }
      return true
    },
    showQuadrantInfo(quadrant) {
      this.highlightedQuadrant = quadrant
    },
    regenerateGalaxy(properties) {
      this.overrideGalaxy = newGalaxy(properties)
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
  width: 100%;
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
