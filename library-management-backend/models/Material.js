class Material {
  static nextId = 1;

  constructor(name, isbn, category) {
    this.id = nextId++;
    this.name = name;
    this.isbn = isbn;
    this.category = category;
  }
}
