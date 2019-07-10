const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermsAndConditionsSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    index: true
  }
},{
  timestamps: true
});

const TermsAndConditions = mongoose.model('TermsAndConditions', TermsAndConditionsSchema);

module.exports = TermsAndConditions;