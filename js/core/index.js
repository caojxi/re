export function el(tagName, ...children) {
  let node = document.createElement(tagName)

  if (children[0] && Array.isArray(children[0])) {
    children = children[0]
  }

  children.forEach(child => {
    if (!mount(node, child)) {
      if (typeof child === 'object') {
        for (const attr in child) {
          // update attribute
          if (node[attr] != null) {
            node[attr] = child[attr]
          } else {
            node.setAttribute(attr, child[attr]) // create attribute
          }
        }
      }
    }
  })

  return node
}

export function mount(parent, child, before = null) {
  const parentEl = parent.el || parent
  const childEl = child.el || child

  if (childEl instanceof Node) {
    if (before) {
      parentEl.insertBefore(childEl, before.el || before)
    } else {
      parentEl.appendChild(childEl)
    }
  } else if (typeof childEl === 'string' || typeof childEl === 'number' || typeof childEl === 'boolean') {
    mount(parentEl, document.createTextNode(childEl))
  } else if (Array.isArray(childEl)) {
    childEl.map(c => mount(parentEl, c))
  } else {
    return false
  }

  return true
}

export function setChildren(parent, children) {
  const parentEl = parent.el || parent
  let traverse = parentEl.firstChild

  children.forEach(child => {
    const childEl = child.el || child

    if (childEl !== traverse) {
      mount(parentEl, childEl, traverse)
    } else {
      traverse = traverse.nextSibling
    }
  })
}
