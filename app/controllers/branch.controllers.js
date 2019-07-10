const Branch = require("../db/models/branch.model");

exports.addBranch = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  Branch.findOne({ name: body.name }).then(branch => {
    if (branch) {
      return res
        .status(400)
        .json({ status: 400, message: "Branch already exists" });
    } else {
      const newBranch = new Branch(body);
      newBranch
        .save()
        .then(branch =>
          res.json({
            status: 200,
            data: branch,
            message: "Branch created successfully"
          })
        )
        .catch(err => console.log(err));
    }
  });
};

exports.fetchBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find().exec();
    if (!branches) {
      return next(res.boom.notFound("Branches not found"));
    }
    return res.json({
      status: 200,
      data: branches
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

// Find a single branch with a branchId
exports.fetchBranchById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const branch = await Branch.findById(id).exec();
    if (!branch) {
      return next("Branch not found");
    }
    return res.json({
      status: 200,
      data: branch
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchNewBranches = async (req, res, next) => {
  const numberOfDaysToLookBack = 3;
  try {
    const branch = await Branch.find({})
      .sort({ createdAt: "desc" })
      .limit(10)
      .populate("bestDeal")
      .populate("deals")
      .exec();
    return res.json({
      status: 200,
      data: branch
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};

exports.fetchNearbyBranches = async (req, res, next) => {
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
      return next(res.boom.notFound("Branches not found"));
    }
    return res.json({
      status: 200,
      data: nearbyBranches
    });
  } catch (error) {
    return next(res.boom.badImplementation("Error retrieving data"));
  }
};
