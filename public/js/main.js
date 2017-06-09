(function () {
'use strict';

function el(tagName) {
  var children = [], len = arguments.length - 1;
  while ( len-- > 0 ) children[ len ] = arguments[ len + 1 ];

  var node = document.createElement(tagName);

  if (children[0] && Array.isArray(children[0])) {
    children = children[0];
  }

  children.forEach(function (child) {
    if (!mount(node, child)) {
      if (typeof child === 'object') {
        for (var attr in child) {
          // update attribute
          if (node[attr] != null) {
            node[attr] = child[attr];
          } else {
            node.setAttribute(attr, child[attr]); // create attribute
          }
        }
      }
    }
  });

  return node
}

function mount(parent, child, before) {
  if ( before === void 0 ) before = null;

  var parentEl = parent.el || parent;
  var childEl = child.el || child;

  if (childEl instanceof Node) {
    if (before) {
      parentEl.insertBefore(childEl, before.el || before);
    } else {
      parentEl.appendChild(childEl);
    }
  } else if (typeof childEl === 'string' || typeof childEl === 'number' || typeof childEl === 'boolean') {
    mount(parentEl, document.createTextNode(childEl));
  } else if (Array.isArray(childEl)) {
    childEl.map(function (c) { return mount(parentEl, c); });
  } else {
    return false
  }

  return true
}

function setChildren(parent, children) {
  var parentEl = parent.el || parent;
  var traverse = parentEl.firstChild;

  children.forEach(function (child) {
    var childEl = child.el || child;

    if (childEl !== traverse) {
      mount(parentEl, childEl, traverse);
    } else {
      traverse = traverse.nextSibling;
    }
  });
}

var header = document.createElement('header');
var h1 = document.createElement('h1');

h1.setAttribute('class', 'title');
h1.textContent = 'View';

document.body.append(header);
header.appendChild(h1);

var h2 = el('h2',
  'Search',
  ' ',
  el('a', { href: 'https://google.com.au', target: '_blank' }, 'Google')
);

mount(document.body, h2);

var h3 = el('h3', 'Languages');

var Li = function Li(data) {
  this.el = el('li', data);
};

mount(document.body, h3);

var items = ['Java', 'C', 'Ruby', 'Python'].map(function (item) {
  return new Li(item)
});

var ul = el('ul', items);

mount(document.body, ul);

setTimeout(function () {
  items.reverse();
  setChildren(ul, items);
}, 5000);

}());
