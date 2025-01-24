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
}

export default MaterialService;
