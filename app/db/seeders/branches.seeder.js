const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Address = require("../models/address.model");
const Location = require("../models/location.model");
const Deal = require("../models/deal.model");
const Branch = require("../models/branch.model");

var BranchesSeeder = Seeder.extend({
  beforeRun: function() {
    const _this = this;
    return Promise.resolve()
      .then(() => _this._loadAddresses())
      .then(() => _this._loadDeals())
      .then(() => _this._loadLocations());
  },
  shouldRun: function() {
    return Branch.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    let branches = [];
    const loopTreshold = 20;
    for (let index = 0; index <= loopTreshold; index++) {
      const address = this._generateAddress(branches);
      const location = this._generateLocation(branches);
      const deals = this._generateDeals();
      const branch = {
        name: faker.company.companyName(),
        active: true,
        address,
        location,
        deals,
        rate: faker.random.number({min: 1, max: 5, precision: 1}),
        raterCount: faker.random.number({min: 20, max: 100, precision: 1}),
        isOpen: faker.random.boolean()
      };
      branches.push(branch);
    }
    return Branch.create(branches);
  },
  _loadAddresses: function() {
    const _this = this;
    return Address.find({})
      .exec()
      .then(addresses => (_this.addresses = addresses));
  },
  _loadDeals: function() {
    const _this = this;
    return Deal.find({})
      .exec()
      .then(deals => (_this.deals = deals));
  },
  _loadLocations: function() {
    const _this = this;
    return Location.find({})
      .exec()
      .then(locations => (_this.locations = locations));
  },
  _generateAddress: function(arr) {
    const address = faker.random.arrayElement(this.addresses);
    const isExisting = arr.some(item => item.address === address._id);
    return isExisting ? this._generateAddress(arr) : address._id;
  },
  _generateDeals: function() {
    let finalDeals = [];
    let randomLoopTreshold = faker.random.number({
      min: 4,
      max: 9,
      precision: 1
    });
    for (let index = 0; index <= randomLoopTreshold; index++) {
      const deal = faker.random.arrayElement(this.deals);
      console.log('Deal: ', deal);
      if (finalDeals.indexOf(deal) === -1) {
        finalDeals.push(deal._id);
      }
    }
    return finalDeals;
  },
  _generateLocation: function(arr) {
    const location = faker.random.arrayElement(this.locations);
    const isExisting = arr.some(item => item.location === location._id);
    return isExisting ? this._generateLocation(arr) : location._id;
  }
});

module.exports = BranchesSeeder;
