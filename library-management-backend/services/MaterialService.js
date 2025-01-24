import MaterialRepository from "../repositories/MaterialRepository.js";

class MaterialService {
  constructor() {
    this._repo = new MaterialRepository();
  }

  create(material) {
    this._repo.create(material);
  }

  getAll() {
    return this._repo.findAll();
  }
}

export default MaterialService;
