const passport = require("passport");
const User = require("../db/models/user.model");
const Company = require("../db/models/company.model");

exports.enrollUser = async (req, res, next) => {
  const { body } = req;
  if (!body.email || !body.password || !body.birthdate || !body.company) {
    return next(res.boom.badRequest("Invalid user body"));
  }
  const user = await User.findOne({ email: body.email });
  if (user) {
    return next(res.boom.notAcceptable("Email already exists"));
  } else {
    const newUser = new User(body);
    newUser.setPassword(body.password);
    return newUser
      .save()
      .then(user =>
        res.json({
          status: 200,
          data: user,
          message: "User created successfully."
        })
      )
      .catch(err => next(err));
  }
};

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(res.boom.badRequest("Email or password is required"));
  }
  return passport.authenticate(
    "login",
    { session: false },
    async (err, passportUser, info) => {
      if (err) {
        return next(res.boom.badRequest(err.message));
      }
      if (info) {
        return next(res.boom.notFound(info.message));
      }
      const user = passportUser;
      const company = await Company.findById(user.company).exec();
      user.token = passportUser.generateJWT();
      user.company = company;
      return res.json({
        status: 200,
        data: user.toAuthJSON(),
        message: "Logged in successfully"
      });
    }
  )(req, res, next);
};

exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .populate("company")
      .exec();
    if (!users) {
      return next(res.boom.notFound("Users not found"));
    }
    return res.json({
      status: 200,
      data: users
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return next(res.boom.notFound(`User not found with id ${id}`));
    }
    return res.json({
      status: 200,
      data: user
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.update = async (req, res, next) => {
  const { body, params } = req;
  try {
    const user = await User.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    )
      .populate("company")
      .exec();
    if (!user) {
      return next(res.boom.notFound("User not found"));
    }
    return res.json({
      status: 200,
      user
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error updating user"));
  }
};

exports.delete = async (req, res, next) => {
  const { params } = req;
  try {
    const user = await User.findByIdAndRemove(params.id).exec();
    if (!user) {
      return next(res.boom.notFound("User not found"));
    }
    return res.json({
      status: 200,
      message: "User deleted successfully"
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error updating user"));
  }
};

exports.changePassword = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email }).exec();
    if (!user) {
      return next(res.boom.notFound("Email does not exist"));
    }
    user.setPassword(body.password);
    user.active = true;
    return user.save().then(user =>
      res.json({
        status: 200,
        user,
        message: "Password successfully changed"
      })
    );
  } catch (error) {
    return next(res.boom.badImplementation("Error changing password"));
  }
};
