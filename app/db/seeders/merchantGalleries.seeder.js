const Seeder = require("mongoose-data-seed").Seeder;
const faker = require("faker");
const MerchantGallery = require("../models/merchantGallery.model");

var MerchantGalleriesSeeder = Seeder.extend({
  shouldRun: function() {
    return MerchantGallery.countDocuments()
      .exec()
      .then(count => count === 0);
  },
  run: function() {
    let galleries = [];
    const loopTreshold = 40;
    for (let index = 0; index <= loopTreshold; index++) {
      const image = faker.image.imageUrl();
      const gallery = {
        image: {
          url: image,
          thumb: {
            url: image
          },
          medium: {
            url: image
          },
          large: {
            url: image
          },
          xLarge: {
            url: image
          }
        }
      };
      galleries.push(gallery);
    }
    return MerchantGallery.create(galleries);
  }
});

module.exports = MerchantGalleriesSeeder;
