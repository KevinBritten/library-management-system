import MaterialService from "../services/MaterialService.js";
import Material from "../models/Material.js";

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
