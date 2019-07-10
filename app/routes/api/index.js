const userRoutes = require("./user.routes");
const companyRoutes = require("./company.routes");
const categoryRoutes = require("./category.routes");
const dealRoutes = require("./deal.routes");
const dealCategoryRoutes = require("./dealCategory.routes");
const branchRoutes = require("./branch.routes");
const merchantGalleryRoutes = require("./merchantGallery.routes");
const merchantRoutes = require("./merchant.routes");
const termRoutes = require("./term.routes");
const isAuthenticated = require("../../configs/auth");

module.exports = function(app) {
  userRoutes(app, isAuthenticated);
  companyRoutes(app, isAuthenticated);
  categoryRoutes(app, isAuthenticated);
  dealRoutes(app, isAuthenticated);
  dealCategoryRoutes(app, isAuthenticated);
  branchRoutes(app, isAuthenticated);
  merchantGalleryRoutes(app, isAuthenticated);
  merchantRoutes(app, isAuthenticated);
  termRoutes(app, isAuthenticated);
};
