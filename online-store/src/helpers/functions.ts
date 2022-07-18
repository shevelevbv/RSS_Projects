export function createElement<T extends HTMLElement> (parentElement: HTMLElement | null, 
                                                      tagName: string, 
                                                      classes = '', 
                                                      content = ''): T {
  const newElement: HTMLElement = document.createElement(tagName);
  newElement.className = classes;
  newElement.textContent = content;
  if (parentElement) {
    parentElement.append(newElement);
  }
  return newElement as T;
}