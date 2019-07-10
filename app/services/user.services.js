const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/user.model");

UserSchema.methods.setPassword = async function(password) {
  this.salt = await bcrypt.genSalt(10);
  this.hash = await bcrypt.hash(password, this.salt, null);
};

UserSchema.methods.validatePassword = async function(password) {
  const hash = await bcrypt.compare(password, this.hash);
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function(user) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate, 60);

  return jwt.sign(user);
};
