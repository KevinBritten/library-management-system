import bcrypt from "bcrypt";

import UserRepository from "../repositories/UserRepository.js";
import User from "../models/User.js";

class UserService {
  constructor() {
    this._repo = new UserRepository();
  }

  async create(role, username, password) {
    if (this._repo.findByUsername(username))
      throw new Error(`User with username ${username} already exists.`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(role, username, hashedPassword, new Date());
    this._repo.create(user);
    return user;
  }

  async authenticateUser(username, password) {
    const user = this._repo.findByUsername(username);
    if (!user) throw new Error(`No user with username ${username} exists.`);
    const { hashedPassword } = user;
    return await bcrypt.compare(password, hashedPassword);
  }

  getUserByUsername(username) {
    const user = this._repo.findByUsername(username);
    if (!user) throw new Error(`No user with username ${username} exists.`);
    return user;
  }

  getAll() {
    return this._repo.findAll();
  }

  update(id, updatedProperties) {
    const result = this._repo.update(id, updatedProperties);
    if (!result) throw new Error(`No user with id ${id} exists.`);
  }

  delete(id) {
    const result = this._repo.delete(id);
    if (!result) throw new Error(`No user with id ${id} exists.`);
  }
}

export default UserService;
