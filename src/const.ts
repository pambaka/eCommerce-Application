export const CLASS_NAMES = {} as const;

class Dom<T extends HTMLElement> {
  elements: { [key: string]: T };

  constructor() {
    this.elements = {};
  }

  add(key: string, value: T): void {
    this.elements[key] = value;
  }
}

export const DOM = new Dom();
