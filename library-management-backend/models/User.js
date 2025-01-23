class User {
  static nextId = 1;

  constructor(role, username, hashedPassword, salt) {
    this.id = User.nextId++;
    this.role = role;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.salt = salt;
    this.signupDate = Date.now();
    this.token = "";
    this.tokenExpiration = null;
  }
}
