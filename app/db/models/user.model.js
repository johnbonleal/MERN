const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../configs/config");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    legacyId: {
      type: String,
      default: null
    },
    firstName: {
      type: String,
      unique: false,
      default: null
    },
    middleName: {
      type: String,
      unique: false,
      default: null
    },
    lastName: {
      type: String,
      unique: false,
      default: null
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      default: null,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      index: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      index: true,
      default: null
    },
    password: {
      type: String,
      unique: false,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    birthdate: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    cardType: {
      type: String,
      default: null
    },
    role: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: null
    },
    visaReferenceNumber: {
      type: String,
      default: null
    },
    cardServiceProvider: {
      type: String,
      default: null
    },
    expirationDate: {
      type: Date,
      default: null
    },
    profileImage: {
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
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpires: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.setPassword = function(password) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(password, salt, null);
};

UserSchema.methods.validatePassword = function(password) {
  const hash = bcrypt.compareSync(password, this.password);
  return hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate, 60);

  const token = jwt.sign(
    {
      email: this.email,
      id: this._id,
    },
    config.app.key,
    {
      expiresIn: '1h',
    }
  );
  // jwt.verify(token, config.app.key, (err, data) => console.log(err, data));
  return token;
};

UserSchema.methods.toAuthJSON = function() {
  return {
    user: {
      _id: this._id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email : this.email,
      password : this.password,
      mobile: this.mobile,
      active: this.active,
      birthdate: this.birthdate,
      profileImage: this.profileImage,
      address: this.address,
      refreshToken: this.resetPasswordToken,
      resetPasswordExpires: this.resetPasswordExpires
    },
    accessToken: this.generateJWT(),
    company: this.company,
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
