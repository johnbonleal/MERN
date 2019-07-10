const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  mobile: {
    type: String,
    default: null
  },
  landline: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  }
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
