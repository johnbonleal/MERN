const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantGallerySchema = new Schema ({
  image: {
    url: {
      type: String,
      default: null
    },
    thumb: {
      url: {
        type: String,
        default: null
      }
    },
    medium: {
      url: {
        type: String,
        default: null
      }
    },
    large: {
      url: {
        type: String,
        default: null
      }
    },
    xLarge: {
      url: {
        type: String,
        default: null
      }
    },
  }
},{
  timestamps: true
});

const MerchantGallery = mongoose.model('MerchantGallery', MerchantGallerySchema);

module.exports = MerchantGallery;