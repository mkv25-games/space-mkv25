const { read, write, position } = require('promise-path')
const cheerio = require('cheerio')

const here = position(__dirname)
const inputpath = here('../mainui/src/models/visual/regions.inkscape.svg')
const outputpath = here('../data/regions.json')

async function run() {
  const svg = await read(inputpath)
  const $svg = cheerio.load(svg)
  const rects = $svg('rect').toArray().map(el => {
    $el = $svg(el)
    return {
      id: $el.attr('id'),
      label: $svg(el, 'title').text().trim(),
      x: $el.attr('x'),
      y: $el.attr('y'),
      width: $el.attr('width'),
      height: $el.attr('height'),
      color: $el.attr('fill')
    }
  })
  const left = Math.min(...rects.map(r => r.x))
  const right = Math.max(...rects.map(r => r.x + r.width))
  const top = Math.min(...rects.map(r => r.y))
  const bottom = Math.min(...rects.map(r => r.y + r.height))
  const boundary = {
    x: left,
    y: top,
    width: right,
    height: bottom
  }
  const regions = {
    source: inputpath,
    svg: svg.length + ' bytes',
    boundary,
    rects
  }
  await write(outputpath, JSON.stringify(regions, null, 2))
}

run()
