class PageElement<NodeType extends HTMLElement = HTMLElement> {
  node: NodeType;
  constructor(parentElement: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const element: HTMLElement = document.createElement(tagName);
    element.className = className;
    element.textContent = content;
    if (parentElement) {
      parentElement.append(element);
    }
    this.node = element as NodeType;
  }

  removeElement(): void {
    this.node.remove();
  }

}

export default PageElement;