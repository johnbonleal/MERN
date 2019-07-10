const passport = require("passport");
const CategoryController = require("../../controllers/category.controllers");

module.exports = (app, isAuthenticated) => {
  app.post("/categories/register", isAuthenticated, CategoryController.addCategory);
  app.get("/categories", isAuthenticated, CategoryController.fetchCategories);
  app.get("/categories/:categoryId", isAuthenticated, CategoryController.fetchCategoryById);
};
