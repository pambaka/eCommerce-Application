export default class Catalog {
  static categories: { [key: string]: string } = {};

  static addCategory(key: string, id: string) {
    this.categories[key] = id;
  }
}
