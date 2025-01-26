import MaterialRepository from "../repositories/MaterialRepository.js";

class MaterialService {
  constructor() {
    this._repo = new MaterialRepository();
  }

  create(material) {
    if (this._repo.findByIsbn(material.isbn))
      throw new Error(`Material with ISBN ${material.isbn} already exists.`);
    this._repo.create(material);
  }

  getAll() {
    return this._repo.findAll();
  }

  update(id, updatedProperties) {
    const result = this._repo.update(id, updatedProperties);
    if (!result) throw new Error(`No material with id ${id} exists.`);
  }

  setBorrowingCustomer(id, customer) {
    const updatedProperties = {
      borrowingCustomerId: customer.id,
      borrowingCustomerName: customer.name,
    };
    this.update(id, updatedProperties);
  }

  returnMaterial(id) {
    const updatedProperties = {
      borrowingCustomerId: null,
      borrowingCustomerName: null,
    };
    this.update(id, updatedProperties);
  }

  delete(id) {
    const result = this._repo.delete(id);
    if (!result) throw new Error(`No material with id ${id} exists.`);
  }
}

export default MaterialService;
