const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Address = require("../models/address.model");

var AddressSeeder = Seeder.extend({
  shouldRun: function() {
    return Address.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    let addresses = [];
    for (let index = 0; index <= 40; index++) {
      const address = {
        addressLine1: faker.address.streetName(),
        addressLine2: faker.address.secondaryAddress(),
        barangay: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode()
      }
      addresses.push(address);
    }
    return Address.create(addresses);
  }
});

module.exports = AddressSeeder;
