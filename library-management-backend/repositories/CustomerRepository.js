import MockDatabase from "../database/MockDatabase.js";

class CustomerRepository {
  constructor() {
    this.db = MockDatabase;
  }

  create(customer) {
    this.db.push(customer);
  }

  findAll() {
    return this.db.customers;
  }

  findById(id) {
    return this.db.customers.find((customer) => customer.id == id) || null;
  }

  findAllByName(name) {
    return this.db.customers.map((customer) => customer.name == name);
  }

  update(id, updateFields) {
    const customer = this.findById(id);
    return customer ? Object.assign(customer, updateFields) : null;
  }

  delete(id) {
    const customer = this.findById(id);
    if (!customer) return false;
    this.db.customers = this.db.customers.filter(
      (customer) => customer.id !== id
    );
    return true;
  }
}

export default CustomerRepository;
