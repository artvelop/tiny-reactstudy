/* @jsx createElement */
import { createElement, render, Component } from './react.js';

class Text extends Component {
  render() {
    return createElement("span", null, "L(", this.props.v, ")");
  }

}

function Hello(props) {
  return createElement("li", {
    className: "item"
  }, createElement(Text, {
    v: props.label
  }));
}

function App() {
  let x = 10;
  x = x ** x;
  return createElement("div", null, createElement("h1", null, "hello world"), createElement("ul", {
    className: "board",
    onClick: () => null
  }, createElement(Hello, {
    label: "Hello balbla"
  }), createElement(Hello, {
    label: `hello ${x}`
  }), createElement(Hello, {
    label: "World 3"
  }), createElement(Hello, {
    label: "React 4"
  })));
}

render(createElement(App, null), document.getElementById('root'));