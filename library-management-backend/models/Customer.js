class Customer {
  static nextId = 1;

  constructor(name) {
    this.id = nextId++;
    this.name = name;
    this.addedDate = Date.now();
    this.borrowedMaterials = [];
  }
}
