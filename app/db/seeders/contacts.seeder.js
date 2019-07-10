const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const Contact = require("../models/contact.model");

var ContactSeeder = Seeder.extend({
  shouldRun: function() {
    return Contact.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    let contacts = [];
    for (let index = 0; index <= 40; index++) {
      const contact = {
        mobile: faker.phone.phoneNumber("09#########"),
        landline: faker.phone.phoneNumber("###-####"),
        email: faker.internet.email()
      };
      contacts.push(contact);
    }
    return Contact.create(contacts);
  }
});

module.exports = ContactSeeder;
