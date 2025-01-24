import MockDatabase from "../database/MockDatabase.js";

class MaterialRepository {
  constructor() {
    this.db = MockDatabase;
  }

  create(material) {
    this.db.push(material);
  }

  findAll() {
    return this.db.materials;
  }

  findById(id) {
    return this.db.materials.find((material) => material.id == id) || null;
  }

  findByIsbn(isbn) {
    return this.db.materials.find((material) => material.isbn == isbn) || null;
  }

  findAllByName(name) {
    return this.db.materials.map((material) => material.name == name);
  }

  findAllByCategory(category) {
    return this.db.materials.map((material) => material.category == category);
  }

  update(id, updateFields) {
    const material = this.findById(id);
    return material ? Object.assign(material, updateFields) : null;
  }

  delete(id) {
    const material = this.findById(id);
    if (!material) return false;
    this.db.materials = this.db.materials.filter(
      (material) => material.id !== id
    );
    return true;
  }
}

exports.default = MaterialRepository;
