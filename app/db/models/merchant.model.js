const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MerchantSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  facebookUrl: {
    type: String,
    default: null,
  },
  instagramUrl: {
    type: String,
    default: null,
  },
  website: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: null,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    default: null
  },
  category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
  },
  branches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
      index: true,
  }],
  termsAndConditions: [{
    type: Schema.Types.ObjectId,
    ref: 'TermsAndConditions',
    index: true
  }],
  merchantGalleries: [{
    type: Schema.Types.ObjectId,
    ref: 'MerchantGallery',
    index: true,
  }],
  promotionValidityDate: {
    type: Date,
    default: null,
  },
  logo: {
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
    }
  },
  qrCode: {
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
    }
  },
  banner: {
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
    }
  },
  sponsorBanner: {
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
    }
  },
  operatingHours: {
    type: String,
    default: null
  },
  isQrActivated: {
    type: Boolean,
    default: null,
  },
  averageRate: {
    type: Number,
    default: null
  },
  blankStars: {
    type: Number,
    default: null
  }
},{
  timestamps: true
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;