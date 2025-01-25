import UserService from "../services/UserService.js";
import User from "../models/User.js";

import bcrypt from "bcrypt";

import { createUpdateObject } from "../utils/utils.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  signup = async (req, res) => {
    try {
      const { role, username, password } = req.body;
      const user = await this.userService.create(role, username, password);
      return res.status(200).json({
        message: "User signed up successfully.",
        user: { role: user.role, username: user.username },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await this.userService.authenticateUser(
        username,
        password
      );
      if (!result) return res.status(500).json({ error: "Incorrect password" });
      const user = this.userService.getUserByUsername(username);
      return res.status(200).json({
        message: "User logged in successfully.",
        user: { role: user.role, username: user.username },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = this.userService.getAll();
      return res.status(200).json({ users: users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const updatedProperties = createUpdateObject(["name"], req.body);
      this.userService.update(req.params.id, updatedProperties);
      return res.status(200).json({ message: "User updated successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      this.userService.delete(req.params.id);
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new UserController();
