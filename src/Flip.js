const map = fn => list => Array.prototype.map.call(list, fn)
const getRects = map(el => el.getBoundingClientRect())
const getHeights = map(([a, b]) => (a.height / b.height).toFixed(3))
const getWidths = map(([a, b]) => (a.width / b.width).toFixed(3))
const getXs = map(([a, b]) => a.left - b.left)
const getYs = map(([a, b]) => a.top - b.top)
const zip = (a, b) => map((a, i) => [a, b[i]])(a)

class Flip {
  constructor(els) {
    this.cleanup = this.cleanup.bind(this)
    this.els = els
  }

  cleanup() {
    this.els.forEach(el => el.classList.remove('animating'))
    this.els[0].removeEventListener('transitionend', this.cleanup)
  }

  run(fn) {
    const befores = getRects(this.els)
    fn()
    const afters = getRects(this.els)
    const pairs = zip(befores, afters)
    const xs = getXs(pairs)
    const ys = getYs(pairs)
    const heights = getHeights(pairs)
    const widths = getWidths(pairs)

    this.els.forEach((el, i) => {
      el.style.transform = `translate3d(${xs[i]}px, ${ys[i]}px, 0) scale(${
        widths[i]
      }, ${heights[i]}) `
      el.style.transformOrigin = '0 0'
    })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.els.forEach(el => {
          el.classList.add('animating')
          el.style.transform = ''
        })
      })
    })

    this.els[0].addEventListener('transitionend', this.cleanup)
  }
}

export default Flip
