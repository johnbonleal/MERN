const Deal = require("../db/models/deal.model");
const DealCategory = require("../db/models/dealCategory.model");
const Branch = require("../db/models/branch.model");
const Merchant = require("../db/models/merchant.model");

exports.addDeal = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  Deal.findOne({ name: body.name }).then(deal => {
    if (deal) {
      return res
        .status(400)
        .json({ status: 400, message: "Deal already exists" });
    } else {
      const newDeal = new Deal(body);
      newDeal
        .save()
        .then(deal =>
          res.json({
            status: 200,
            data: deal,
            message: "Deal created successfully"
          })
        )
        .catch(err => console.log(err));
    }
  });
};

exports.fetchDeals = async (req, res, next) => {
  try {
    const deals = await Deal.find()
      .populate("categories", "name -_id")
      .populate({
        path: "merchant",
        populate: [
          { path: "branches" },
          { path: "category", select: "name -_id" },
          { path: "termsAndConditions", select: "name -_id" },
          { path: "merchantGalleries" }
        ]
      })
      .exec();
    return res.json({
      status: 200,
      data: deals
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

// Find a single deal with a dealId
exports.fetchDealById = async (req, res, next) => {
  const { id } = req.query;
  try {
    const deal = await Deal.findById(id).exec();
    if (!deal) {
      return next(res.boom.notFound("Merchant not found"));
    }
    return res.json({
      status: 200,
      data: deal
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchNewDeals = async (req, res, next) => {
  try {
    const newDeals = await Deal.find({})
      .sort({ createdAt: "desc" })
      .limit(10)
      .populate("categories", "name -_id")
      .populate({
        path: "merchant",
        populate: [
          { path: "branches" },
          { path: "category", select: "name -_id" },
          { path: "termsAndConditions", select: "name -_id" },
          { path: "merchantGalleries" }
        ]
      })
      .exec();
    return res.json({
      status: 200,
      data: newDeals
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchDealsByCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  try {
    const category = await DealCategory.findOne({ name: categoryName });
    const deals = await Deal.find({ categories: { $in: [category._id] } })
      .limit(10)
      .populate("categories", "name -_id")
      .populate({
        path: "merchant",
        populate: [
          { path: "branches" },
          { path: "termsAndConditions", select: "name -_id" },
          { path: "merchantGalleries" }
        ]
      })
      .exec();
    return res.json({
      status: 200,
      data: deals
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchDealsNearby = async (req, res, next) => {
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
      console.log("Nearby branches: ", nearbyBranches)
      const merchant = await Merchant.findOne({ branches: { $in: [ ] }})
      console.log("Nearby branches: ", nearbyBranches)
    // const deals = await Deal.find({
    //   merchant: {
    //     branches: [
    //       {
    //         location: {
    //           $near: {
    //             $geometry: {
    //               type: "Point",
    //               coordinates: [longitude, latitude]
    //             }
    //             // $maxDistance: 3000
    //           }
    //         }
    //       }
    //     ]
    //   }
    // })
    //   .limit(10)
    //   .populate("categories", "name -_id")
    //   .populate({
    //     path: "merchant",
    //     populate: [
    //       { path: "branches" },
    //       { path: "termsAndConditions", select: "name -_id" },
    //       { path: "merchantGalleries" }
    //     ]
    //   });
    // if (!deals) {
    //   return next(res.boom.notFound("No merchants near you"));
    // }
    // return res.json({
    //   status: 200,
    //   data: deals
    // });
  } catch (error) {
    console.log("Error: ", error)
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};
