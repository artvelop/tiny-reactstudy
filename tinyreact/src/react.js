export class Component {
  constructor(props) {
    this.props = props;
  }
}

function renderElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  if (node === undefined) return;

  const $el = document.createElement(node.type);

  node.children.map(renderElement).forEach((node) => {
    $el.appendChild(node);
  });

  return $el;
}

export function render(vdom, container) {
  container.appendChild(renderElement(vdom));
}

export function createElement(type, props, ...children) {
  if (typeof type === 'function') {
    if (type.prototype instanceof Component) {
      const comp = new type({ ...props, children });
      return comp.render.call(comp);
    } else {
      return type.apply(null, [props, ...children]);
    }
  }
  return { type, props, children };
}
