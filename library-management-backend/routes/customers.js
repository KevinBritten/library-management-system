import express from "express";
var router = express.Router();
import CustomerController from "../controllers/CustomerController.js";

router.post("/create", CustomerController.createCustomer);
router.get("/getAll", CustomerController.getAllCustomers);
router.delete("/delete/:id", CustomerController.deleteCustomer);
router.put("/update/:id", CustomerController.updateCustomer);

export default router;
