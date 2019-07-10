var mongooseLib = require("mongoose");

mongooseLib.Promise = global.Promise || Promise;

const Addresses = require("./app/db/seeders/address.seeder");
const Contacts = require("./app/db/seeders/contacts.seeder");
const Companies = require("./app/db/seeders/companies.seeder");
// const Users = require('./app/db/seeders/users.seeder');
const Categories = require("./app/db/seeders/categories.seeder");
const Locations = require("./app/db/seeders/locations.seeder");
const DealCategories = require("./app/db/seeders/dealCategories.seeder");
const Deals = require("./app/db/seeders/deals.seeder");
const Terms = require("./app/db/seeders/terms.seeder");
const Branches = require("./app/db/seeders/branches.seeder");
const MerchantGalleries = require("./app/db/seeders/merchantGalleries.seeder");
const Merchants = require("./app/db/seeders/merchants.seeder");

module.exports = {
  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: "mongodb://localhost/react-api:27017",

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    Addresses,
    Contacts,
    Companies,
    // Users,
    Categories,
    Locations,
    DealCategories,
    MerchantGalleries,
    Terms,
    Deals,
    Branches,
    Merchants,
  }
};
