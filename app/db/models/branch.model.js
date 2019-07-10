const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema(
  {
    legacyId: {
      type: String,
      default: null
    },
    deals: [{
      type: Schema.Types.ObjectId,
      ref: "Deal",
      index: true
    }],
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: null
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      default: null
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      default: null
    },
    rate: {
      type: Number,
      default: null
    },
    raterCount: {
      type: Number,
      default: null
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = Branch;
