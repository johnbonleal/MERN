var Seeder = require("mongoose-data-seed").Seeder;
var faker = require("faker");
var User = require("../models/user.model");
var Company = require("../models/company.model");

var UsersSeeder = Seeder.extend({
  beforeRun: function() {
    var _this = this;
    return Promise.resolve()
      .then(() => _this._loadCompanies());
  },
  shouldRun: function() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return User.create(this._generateUser());
  },
  _loadCompanies: function() {
    const _this = this;
    return Company.find({})
      .exec()
      .then(companies => (_this.companies = companies));
  },
  _generateUser: function() {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "user@venteny.com",
      password: "123456",
      birthdate: "1992-03-29",
      company: faker.random.arrayElement(this.companies)._id
    };
    return user;
  }
});

module.exports = UsersSeeder;
