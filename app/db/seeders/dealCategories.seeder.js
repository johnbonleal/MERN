const Seeder = require("mongoose-data-seed").Seeder;
const DealCategory = require("../models/dealCategory.model");

var data = [
  {
    name: "top"
  },
  {
    name: "recommended"
  },
  {
    name: "nearby"
  },
  {
    name: "birthday"
  }
];

var DealCategoriesSeeder = Seeder.extend({
  shouldRun: function() {
    return DealCategory.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return DealCategory.create(data);
  }
});

module.exports = DealCategoriesSeeder;
