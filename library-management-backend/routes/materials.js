// var express = require("express");
import express from "express";
var router = express.Router();
import MaterialController from "../controllers/MaterialController.js";
import authorizeRole from "../middleware/authorizeRole.js";

router.post("/create", MaterialController.createMaterial);
router.get("/getAll", MaterialController.getAllMaterials);
router.delete(
  "/delete/:id",
  authorizeRole("owner"),
  MaterialController.deleteMaterial
);
router.put("/update/:id", MaterialController.updateMaterial);

export default router;
