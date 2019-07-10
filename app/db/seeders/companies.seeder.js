const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Company = require("../models/company.model");
const Contact = require("../models/contact.model");
const Address = require("../models/address.model");

var CompaniesSeeder = Seeder.extend({
  beforeRun: function() {
    const _this = this;
    return Promise.resolve()
      .then(() => _this._loadAddresses())
      .then(() => _this._loadContacts());
  },
  shouldRun: function() {
    return Company.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    let companies = [];
    const loopTreshold = 10;
    for (let index = 0; index <= loopTreshold; index++) {
      const company = {
        name: faker.company.companyName(),
        description: faker.random.words(),
        address: faker.random.arrayElement(this.addresses),
        contact: faker.random.arrayElement(this.contacts)
      };
      companies.push(company);
    }
    return Company.create(companies);
  },
  _loadAddresses: function() {
    const _this = this;
    return Address.find({})
      .exec()
      .then(addresses => (_this.addresses = addresses));
  },
  _loadContacts: function() {
    const _this = this;
    return Contact.find({})
      .exec()
      .then(contacts => (_this.contacts = contacts));
  }
});

module.exports = CompaniesSeeder;
