class User {
  static nextId = 1;

  constructor(role, username, hashedPassword, signupDate) {
    this.id = User.nextId++;
    this.role = role;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.signupDate = signupDate;
  }
}

export default User;
