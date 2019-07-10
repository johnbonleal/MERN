const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    addressLine1: {
      type: String,
      default: null
    },
    addressLine2: {
      type: String,
      default: null
    },
    barangay: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    state: {
      type: String,
      default: null
    },
    zip: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
