<template>
  <svg v-if="layout"
    :width="layout.width" :height="layout.height">
    <g>
      <edge v-for="edge in layout.edges" :key="edge.id" :edge="edge" />
    </g>
    <g>
      <tech-box v-for="tech in layout.children" :key="tech.id"
        :className="tech.className"
        :tech="tech" />
    </g>
  </svg>
</template>

<script>
const ELK = require('elkjs')
const elk = new ELK()

const graph = {
  id: 'technology-root',
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

function removeEmptyEdges(edge) {
  const hasTargets = edge.targets && edge.targets.length > 0
  const hasSources = edge.sources && edge.sources.length > 0
  return hasTargets && hasSources
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
    },
    facilities() {
      return this.$store.state.gamedata.Facility || []
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
      const { technologies, facilities } = this
      const techChildren = technologies.map((tech => {
        return {
          id: `t_${tech.name}`,
          width: 120,
          height: 60,
          label: tech.name,
          className: 'tech'
        }
      }))
      const facilityChildren = facilities.map(facility => {
        return {
          id: `f_${facility.name}`,
          width: 120,
          height: 60,
          label: facility.name,
          className: 'facility',
          data: facility
        }
      })
      graph.children = [ ...techChildren, ...facilityChildren ]
      console.log('Children:', graph.children)

      const facilityEdges = []
      facilities.forEach((facility, i) => {
        const requires = (facility.tech.requires || '').split(', ').filter(n => n)
        const supports = (facility.tech.supports || '').split(', ').filter(n => n)
        requires.forEach((item, n) => {
          facilityEdges.push({
            id: `fse_${i}_${n}`,
            sources: [`t_${item}`],
            targets: [`f_${facility.name}`],
            facility
          })
        })
        supports.forEach((item, n) => {
          facilityEdges.push({
            id: `fte_${i}_${n}`,
            sources: [`f_${facility.name}`],
            targets: [`t_${item}`],
            facility
          })
        })
      })
      graph.edges = [ ...facilityEdges ].filter(removeEmptyEdges)
      console.log('Technology Diagram ????', graph.edges)
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