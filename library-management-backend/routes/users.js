import express from "express";
var router = express.Router();
import UserController from "../controllers/UserController.js";

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.delete("/delete/:id", UserController.deleteUser);
router.put("/update/:id", UserController.updateUser);

export default router;
