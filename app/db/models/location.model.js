const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  type: { type: String, enum: ["Point"], required: true },
  coordinates: {
    type: [Number],
    required: true
  }
});

const Location = mongoose.model("Location", LocationSchema);

// Location.index({ location: "2dsphere" });

module.exports = Location;
