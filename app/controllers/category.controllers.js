const Category = require("../db/models/category.model");

exports.addCategory = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  Category.findOne({ name: body.name }).then(category => {
    if (category) {
      return res.status(400).json({ status: 400, message: "Category already exists" })
    } else {
      const newCategory = new Category(body);
      newCategory
        .save()
        .then(category => res.json({ status: 200, data: category, message: "Category created successfully"}))
        .catch(err => console.log(err));
    }
  })
};

exports.fetchCategories = (req, res, next) => {
  Category.find()
    .then(companies => {
      res.send(companies);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving data."
      });
    });
};

// Find a single category with a categoryId
exports.fetchCategoryById = (req, res) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId
        });
      }
      res.send(category);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId
        });
      }
      return res.status(500).send({
        message: "Category retrieving category with id " + req.params.categoryId
      });
    });
};