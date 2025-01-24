import CustomerService from "../services/CustomerService.js";
import Customer from "../models/Customer.js";

import { createUpdateObject } from "../utils/utils.js";

class CustomerController {
  constructor() {
    this.customerService = new CustomerService();
  }

  createCustomer = async (req, res) => {
    try {
      const { name } = req.body;
      const customer = new Customer(name, new Date());
      this.customerService.create(customer);
      return res.status(200).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllCustomers = async (req, res) => {
    try {
      const customers = this.customerService.getAll();
      return res.status(200).json({ customers: customers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateCustomer = async (req, res) => {
    try {
      const updatedProperties = createUpdateObject(["name"], req.body);
      this.customerService.update(req.params.id, updatedProperties);
      return res
        .status(200)
        .json({ message: "Customer updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteCustomer = async (req, res) => {
    try {
      this.customerService.delete(req.params.id);
      return res
        .status(200)
        .json({ message: "Customer deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new CustomerController();
