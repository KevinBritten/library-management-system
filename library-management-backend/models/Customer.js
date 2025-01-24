class Customer {
  static nextId = 1;

  constructor(name, dateAdded) {
    this.id = Customer.nextId++;
    this.name = name;
    this.addedDate = dateAdded;
    this.borrowedMaterials = [];
  }
}

export default Customer;
