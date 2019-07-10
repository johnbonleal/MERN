const DealCategoryController = require('../../controllers/dealCategory.controllers');

module.exports = (app, isAuthenticated) => {
  app.post('/dealCategories/register', isAuthenticated, DealCategoryController.addDealCategory);
  app.get('/dealCategories', isAuthenticated, DealCategoryController.fetchDealCategories);
  app.get('/dealCategories/:dealId', isAuthenticated, DealCategoryController.fetchDealCategoryById);
}