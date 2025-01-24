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

  delete(id) {
    const result = this._repo.delete(id);
    if (!result) throw new Error(`No material with id ${id} exists.`);
  }
}

export default MaterialService;
