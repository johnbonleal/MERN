var Seeder = require("mongoose-data-seed").Seeder;
const Terms = require("../models/terms.model");

var data = [
  {
    name: "Present VENTENY Access Card (physical or virtual)"
  },
  {
    name: "Bring valid ID in case of verification"
  },
  {
    name: "Promo not in conjunction with other promos"
  }
];

var TermsSeeder = Seeder.extend({
  shouldRun: function() {
    return Terms.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    return Terms.create(data);
  },
});

module.exports = TermsSeeder;