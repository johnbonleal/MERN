const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema ({
  name: {
    type: String,
    unique: true,
    default: null,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
    index: true,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
    index: true,
  },
  legacyId: {
    type: String,
    default: null,
  },
  loanType: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  },
  membershipCardType: {
    type: String,
    default: null
  },
  availaStatus: {
    type: Boolean,
    default: false
  },
  goAdvanceStatus: {
    type: Boolean,
    default: false
  },
  vBenefitsStatus: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;