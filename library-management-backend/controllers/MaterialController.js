import MaterialService from "../services/MaterialService.js";
import Material from "../models/Material.js";

import { createUpdateObject } from "../utils/utils.js";

class MaterialController {
  constructor() {
    this.materialService = new MaterialService();
  }

  createMaterial = async (req, res) => {
    try {
      const { name, isbn, category } = req.body;
      const material = new Material(name, isbn, category);
      this.materialService.create(material);
      return res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllMaterials = async (req, res) => {
    try {
      const materials = this.materialService.getAll();
      return res.status(200).json({ materials: materials });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateMaterial = async (req, res) => {
    try {
      const updatedProperties = createUpdateObject(
        ["name", "isbn", "category"],
        req.body
      );
      this.materialService.update(req.params.id, updatedProperties);
      return res
        .status(200)
        .json({ message: "Material updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  borrowMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      const { customer } = req.body;
      this.materialService.setBorrowingCustomer(id, customer);
      return res
        .status(200)
        .json({ message: "Material borrowed successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  returnMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      this.materialService.returnMaterial(id);
      return res
        .status(200)
        .json({ message: "Material returned successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteMaterial = async (req, res) => {
    try {
      this.materialService.delete(req.params.id);
      return res
        .status(200)
        .json({ message: "Material deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new MaterialController();
