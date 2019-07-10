const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Address = require("../models/address.model");
const Branch = require("../models/branch.model");
const Category = require("../models/category.model");
const Contact = require("../models/contact.model");
const Merchant = require("../models/merchant.model");
const Deal = require("../models/deal.model");
const Term = require("../models/terms.model");
const MerchantGallery = require("../models/merchantGallery.model");

var MerchantsSeeder = Seeder.extend({
  beforeRun: function() {
    const _this = this;
    return Promise.resolve()
      .then(() => _this._loadBranches())
      .then(() => _this._loadCategories())
      .then(() => _this._loadContacts())
      .then(() => _this._loadTerms())
      .then(() => _this._loadMerchantGalleries());
  },
  shouldRun: function() {
    return Merchant.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Merchant.create(this._generateMerchants());
  },
  _loadBranches: function() {
    const _this = this;
    return Branch.find({})
      .exec()
      .then(branches => (_this.branches = branches));
  },
  _loadCategories: function() {
    const _this = this;
    return Category.find({})
      .exec()
      .then(categories => (_this.categories = categories));
  },
  _loadContacts: function() {
    const _this = this;
    return Contact.find({})
      .exec()
      .then(contacts => (_this.contacts = contacts));
  },
  _loadTerms: function() {
    const _this = this;
    return Term.find({})
      .exec()
      .then(terms => (_this.terms = terms));
  },
  _loadMerchantGalleries: function() {
    const _this = this;
    return MerchantGallery.find({})
      .exec()
      .then(merchantGalleries => (_this.merchantGalleries = merchantGalleries));
  },
  _generateBranches: function() {
    const _this = this;
    const branches = [];
    let randomLoopTreshold = faker.random.number({
      min: 1,
      max: 10,
      precision: 1
    });
    for (let index = 0; index <= randomLoopTreshold; index++) {
      const branch = faker.random.arrayElement(_this.branches);
      if (branches.indexOf(branch) === -1) {
        branches.push(branch);
      }
    }
    return branches;
  },
  _generateTerms: function() {
    let finalTerms = [];
    let randomLoopTreshold = faker.random.number({
      min: 1,
      max: 3,
      precision: 1
    });
    for (let index = 0; index <= randomLoopTreshold; index++) {
      const term = faker.random.arrayElement(this.terms);
      if (finalTerms.indexOf(term) === -1) {
        finalTerms.push(term);
      }
    }
    return finalTerms;
  },
  _generateMerchantGalleries: function() {
    let merchantGalleries = [];
    let index = 0;
    do {
        const randomIndex = faker.random.number({
        min: 1,
        max: this.merchantGalleries.length - 1,
        precision: 1
      });
      const gallery = this.merchantGalleries[randomIndex];
      const isExisting = merchantGalleries.some(item => item._id === gallery._id);
      if (!isExisting) merchantGalleries.push(gallery);
      index++;
    } while(merchantGalleries.length < 4);
    return merchantGalleries;
  },
  _generateContact: function(arr) {
    const contact = faker.random.arrayElement(this.contacts);
    const isExisting = arr.some(item => item.contact === contact._id);
    return isExisting ? this._generateContact(arr) : contact._id;
  },
  _generateMerchants: function() {
    const merchants = [];
    const loopTreshold = 25;
    for (index = 0; index <= loopTreshold; index++) {
      const termsAndConditions = this._generateTerms();
      const branches = this._generateBranches();
      const logo = faker.image.imageUrl();
      const banner = faker.image.imageUrl();
      const merchantGalleries = this._generateMerchantGalleries();
      const contact = this._generateContact(merchants);
      const timeFrom = faker.random.number({ min: 9, max: 10, precision: 1});
      const timeTo = faker.random.number({ min: 6, max: 7, precision: 1 });
      const merchant = {
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
        facebookUrl: faker.internet.url(),
        instagramUrl: faker.internet.url(),
        website: faker.internet.url(),
        active: faker.random.boolean(),
        averageRate: faker.random.number({ min: 1, max: 5, precision: 1 }),
        category: faker.random.arrayElement(this.categories),
        logo: {
          url: logo,
          thumb: {
            url: logo
          },
          medium: {
            url: logo
          },
          large: {
            url: logo
          },
          xLarge: {
            url: logo
          }
        },
        banner: {
          url: banner,
          thumb: {
            url: banner
          },
          medium: {
            url: banner
          },
          large: {
            url: banner
          },
          xLarge: {
            url: banner
          }
        },
        operatingHours: `${timeFrom} AM - ${timeTo} PM`,
        contact,
        merchantGalleries,
        branches,
        termsAndConditions
      };
      merchants.push(merchant);
    }
    return merchants;
  }
});

module.exports = MerchantsSeeder;