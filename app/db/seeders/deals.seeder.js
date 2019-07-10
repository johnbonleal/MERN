const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Deal = require("../models/deal.model");
const DealCategory = require("../models/dealCategory.model");
const Merchant = require("../models/merchant.model");

var DealsSeeder = Seeder.extend({
  beforeRun: function() {
    const _this = this;
    return Promise.resolve()
      .then(() => _this._loadCategories());
  },
  shouldRun: function() {
    return Deal.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Deal.create(this._generateDeals());
  },
  _loadCategories: function() {
    const _this = this;
    return DealCategory.find({})
      .exec()
      .then(categories => (_this.categories = categories));
  },
  _loadMerchants: function() {
    const _this = this;
    return Merchant.find({})
      .exec()
      .then(merchants => (_this.merchants = merchants));
  },
  _generateCategories: function() {
    let categories = [];
    const loopTreshold = faker.random.number({
      min: 1,
      max: 3,
      precision: 1
    });
    for (index = 0; index <= loopTreshold; index++) {
      const categoryId = faker.random.arrayElement(this.categories)._id;
      if (categories.indexOf(categoryId) === -1) {
        categories.push(categoryId);
      }
    }
    return categories;
  },
  _generateDeals: function() {
    let deals = [];
    const loopTreshold = 30;
    const dealPercentages = [
      "10% OFF",
      "20% OFF",
      "30% OFF",
      "40% OFF",
      "50% OFF"
    ];
    for (let index = 0; index <= loopTreshold; index++) {
      const categories = this._generateCategories();
      const deal = {
        name: faker.random.arrayElement(dealPercentages),
        description: faker.lorem.words(),
        rate: faker.random.number({ min: 1, max: 5, precision: 1 }),
        raterCount: faker.random.number({ min: 20, max: 100, precision: 1 }),
        active: true,
        categories
      };
      deals.push(deal);
    }
    return deals;
  }
});

module.exports = DealsSeeder;