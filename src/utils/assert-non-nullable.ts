const assertNonNullable = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element was not found for "${selector}" selector.`);
  }
  return element;
};

export default assertNonNullable;
