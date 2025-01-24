import MockDatabase from "../database/MockDatabase.js";

class UserRepository {
  constructor() {
    this.db = MockDatabase;
  }

  create(user) {
    this.db.push(user);
  }

  findAll() {
    return this.db.users;
  }

  findById(id) {
    return this.db.users.find((user) => user.id == id) || null;
  }

  findByUsername(username) {
    return this.db.users.find((user) => user.username == username) || null;
  }

  findAllByRole(role) {
    return this.db.customers.map((customer) => customer.role == role);
  }

  update(id, updateFields) {
    const user = this.findById(id);
    return user ? Object.assign(user, updateFields) : null;
  }

  delete(id) {
    const user = this.findById(id);
    if (!user) return false;
    this.db.users = this.db.users.filter((user) => user.id !== id);
    return true;
  }
}

exports.default = UserRepository;
