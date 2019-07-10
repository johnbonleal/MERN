const Merchant = require("../db/models/merchant.model");
const DealCategory = require("../db/models/dealCategory.model");
const Branch = require("../db/models/branch.model");

exports.addMerchant = async (req, res, next) => {
  const { body } = req;
  if (!body) {
    return next(res.boom.badRequest("Please complete all required fields"));
  }
  const merchant = Merchant.findOne({ name: body.name });
  if (merchant) {
    return next(res.boom.notAcceptable("Merchant already exists"));
  } else {
    const newMerchant = new Merchant(body);
    return newMerchant
      .save()
      .then(merchant =>
        res.json({
          status: 200,
          data: merchant,
          message: "Merchant created successfully"
        })
      )
      .catch(err => next(err));
  }
};

exports.fetchMerchants = async (req, res, next) => {
  try {
    const merchants = await Merchant.find()
      .populate("branches")
      .populate("categories", "name")
      .populate("termsAndConditions", "name")
      .exec();
    if (!merchants) {
      return next(res.boom.notFound("Merchants not found"));
    }
    return res.json({
      status: 200,
      data: merchants
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

// Find a single merchant with a merchantId
exports.fetchMerchantById = async (req, res, next) => {
  const { id } = req.query;
  try {
    const merchant = await Merchant.findById(id).exec();
    if (!merchant) {
      return next(res.boom.notFound("Merchant not found"));
    }
    return res.json({
      status: 200,
      data: merchant
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchNewMerchants = async (req, res, next) => {
  const numberOfDaysToLookBack = 3;
  try {
    const merchant = await Merchant.find({})
      .sort({ createdAt: "desc" })
      .limit(10)
      .populate("branches")
      .populate({
        path: "deals",
        populate: { path: "categories", select: "name -_id" }
      })
      .populate("category", "name")
      .populate("termsAndConditions", "name -_id")
      .populate("bestDeal")
      .populate("merchantGalleries")
      .exec();
    if (!merchant) {
      return next(res.boom.notFound("Merchant not found"));
    }
    return res.json({
      status: 200,
      data: merchant
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchNearbyMerchants = async (req, res, next) => {
  const { longitude, latitude } = req.body.coordinates;
  try {
    const nearbyBranches = await Branch.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
          // $maxDistance: 3000
        }
      }
    })
      .limit(10)
      .exec();
    if (!nearbyBranches) {
      return next(res.boom.notFound("Merchant not found"));
    }
    return res.json({
      status: 200,
      data: nearbyBranches
    });
  } catch (error) {
    console.log("Error: ", error);
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};
