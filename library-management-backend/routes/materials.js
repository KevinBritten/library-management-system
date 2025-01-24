// var express = require("express");
import express from "express";
var router = express.Router();
import MaterialController from "../controllers/MaterialController.js";

router.post("/create", MaterialController.createMaterial);
router.get("/getAll", MaterialController.getAllMaterials);
router.delete("/delete/:id", MaterialController.deleteMaterial);

export default router;
