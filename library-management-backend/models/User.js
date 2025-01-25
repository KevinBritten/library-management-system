class User {
  static nextId = 1;

  constructor(role, username, hashedPassword, salt, signupDate) {
    this.id = User.nextId++;
    this.role = role;
    this.username = username;
    this.hashedPassword = hashedPassword;
    this.salt = salt;
    this.signupDate = signupDate;
    this.token = "";
    this.tokenExpiration = null;
  }
}
