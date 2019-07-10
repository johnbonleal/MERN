const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Location = require("../models/location.model");

var LocationsSeeder = Seeder.extend({
  shouldRun: function() {
    return Location.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    const locations = [];
    const loopTreshold = 100;
    for (let index = 0; index <= loopTreshold; index++) {
      const location = {
        type: "Point",
        coordinates: [faker.address.longitude(), faker.address.latitude()]
      }
      locations.push(location);
    }
    return Location.create(locations);
  },
});

module.exports = LocationsSeeder;
