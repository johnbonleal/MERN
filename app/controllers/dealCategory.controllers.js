const DealCategory = require("../db/models/dealCategory.model");

exports.addDealCategory = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  DealCategory.findOne({ name: body.name }).then(dealCategory => {
    if (dealCategory) {
      return res.status(400).json({ status: 400, message: "DealCategory already exists" })
    } else {
      const newDealCategory = new DealCategory(body);
      newDealCategory
        .save()
        .then(dealCategory => res.json({ status: 200, data: dealCategory, message: "DealCategory created successfully"}))
        .catch(err => console.log(err));
    }
  })
};

exports.fetchDealCategories = (req, res) => {
  DealCategory.find()
    .then(dealCategories => {
      res.send(dealCategories);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving data."
      });
    });
};

// Find a single dealCategory with a dealCategoryId
exports.fetchDealCategoryById = (req, res) => {
  DealCategory.findById(req.params.dealCategoryId)
    .then(dealCategory => {
      if (!dealCategory) {
        return res.status(404).send({
          message: "DealCategory not found with id " + req.params.dealCategoryId
        });
      }
      res.send(dealCategory);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "DealCategory not found with id " + req.params.dealCategoryId
        });
      }
      return res.status(500).send({
        message: "Error retrieving dealCategory with id " + req.params.dealCategoryId
      });
    });
};