function createEl(tag, props, ...children) {
  const element = document.createElement(tag);
  const withProps = Object.assign(element, props);
  withProps.append(...children);
  return withProps;
}

export default createEl;
