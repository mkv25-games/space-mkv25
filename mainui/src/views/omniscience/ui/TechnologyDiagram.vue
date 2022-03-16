<template>
  <svg v-if="layout"
    :width="layout.width" :height="layout.height">
    <g>
      <edge v-for="edge in layout.edges" :key="edge.id" :edge="edge" />
    </g>
    <g>
      <tech-box v-for="tech in layout.children" :key="tech.id"
        :tech="tech" />
    </g>
  </svg>
</template>

<script>
const ELK = require('elkjs')
const elk = new ELK()

const graph = {
  id: 'root',
  layoutOptions: {
    'elk.algorithm': 'layered',
    'spacing.nodeNodeBetweenLayers': 50,
    'elk.direction': 'RIGHT'
  },
  children: [
    { id: 'n1', width: 120, height: 60, label: 'Chemistry' },
    { id: 'n2', width: 120, height: 60, label: 'Biology' },
    { id: 'n3', width: 120, height: 60, label: 'Physics' }
  ],
  edges: [
    { id: 'e1', sources: [ 'n1' ], targets: [ 'n2' ] },
    { id: 'e2', sources: [ 'n1' ], targets: [ 'n3' ] }
  ]
}

export default {
  data() {
    return {
      layout: {
        children: [],
        edges: []
      }
    }
  },
  computed: {
    technologies() {
      return this.$store.state.gamedata.Technology || []
    }
  },
  async mounted() {
    await this.updateGraph()
    const layout = await this.computeLayout()
    console.log('Technology Diagram Mounted:', layout)
    this.layout = layout
  },
  methods: {
    async updateGraph() {
      const { technologies } = this
      graph.children = technologies.map((tech => {
        return {
          id: tech.name,
          width: 120,
          height: 60,
          label: tech.name
        }
      }))
      console.log('Children:', graph.children)
      const a = graph.children[0] || { id: 'Chemistry' }
      const b = graph.children[1] || { id: 'Biology' }
      graph.edges = [{
        id: 'e1',
        sources: [a.id],
        targets: [b.id]
      }]
    },
    async computeLayout() {
      let result = {}
      try {
        result = await elk.layout(graph)
        console.log('Technology Diagram, ELKJS Result:', result)
      } catch (ex) {
        console.error('Technology Diagram, ELKJS Error:', ex)
      }
      return result
    }
  }
}
</script>