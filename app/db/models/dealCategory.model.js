const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealCategorySchema = new Schema ({
  name: {
    type: String,
    required: true,
  }
},{
  timestamps: true
});

const DealCategory = mongoose.model('DealCategory', DealCategorySchema);

module.exports = DealCategory;