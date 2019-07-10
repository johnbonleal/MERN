var Seeder = require("mongoose-data-seed").Seeder;
var Category = require("../models/category.model");

var data = [
  {
    name: "Accessories and Apparels"
  },
  {
    name: "Beauty and Wellness"
  },
  {
    name: "Electronics and Appliances"
  },
  {
    name: "Fitness and Sports"
  },
  {
    name: "Hotels and Resorts"
  },
  {
    name: "Medical"
  },
  {
    name: "Paymaya"
  },
  {
    name: "Restaurants and Bars"
  },
  {
    name: "Services"
  },
  {
    name: "Things to do"
  }
];

var CategoriesSeeder = Seeder.extend({
  shouldRun: function() {
    return Category.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Category.create(data);
  }
});

module.exports = CategoriesSeeder;
