import CustomerRepository from "../repositories/CustomerRepository.js";

class CustomerService {
  constructor() {
    this._repo = new CustomerRepository();
  }

  create(customer) {
    this._repo.create(customer);
  }

  getAll() {
    return this._repo.findAll();
  }

  update(id, updatedProperties) {
    const result = this._repo.update(id, updatedProperties);
    if (!result) throw new Error(`No customer with id ${id} exists.`);
  }

  delete(id) {
    const result = this._repo.delete(id);
    if (!result) throw new Error(`No customer with id ${id} exists.`);
  }
}

export default CustomerService;
