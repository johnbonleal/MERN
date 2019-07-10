const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: null,
  },
  rate: {
    type: Number,
    default: null
  },
  raterCount: {
    type: Number,
    default: null
  },
  birthday: {
    type: Boolean,
    default: null
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DealCategory',
      required: true,
      index: true,
    }
  ]
},{
  timestamps: true
});


const Deal = mongoose.model('Deal', DealSchema);

module.exports = Deal;