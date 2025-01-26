class Material {
  static nextId = 1;

  constructor(name, isbn, category) {
    this.id = Material.nextId++;
    this.name = name;
    this.isbn = isbn;
    this.category = category;
    this.borrowingCustomerId = null;
    this.borrowingCustomerName = null;
  }
}

export default Material;
