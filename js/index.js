import { el, mount, setChildren } from './core'

const header = document.createElement('header')
const h1 = document.createElement('h1')

h1.setAttribute('class', 'title')
h1.textContent = 'View'

document.body.append(header)
header.appendChild(h1)

const h2 = el('h2',
  'Search',
  ' ',
  el('a', { href: 'https://google.com.au', target: '_blank' }, 'Google')
)

mount(document.body, h2)

const h3 = el('h3', 'Languages')

class Li {
  constructor(data) {
    this.el = el('li', data)
  }
}

mount(document.body, h3)

const items = ['Java', 'C', 'Ruby', 'Python'].map(item => {
  return new Li(item)
})

const ul = el('ul', items)

mount(document.body, ul)

setTimeout(() => {
  items.reverse()
  setChildren(ul, items)
}, 5000)
