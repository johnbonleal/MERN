const DealController = require('../../controllers/deal.controllers');

module.exports = (app, isAuthenticated) => {
  app.post('/deals/register', isAuthenticated, DealController.addDeal);
  app.get('/deals', isAuthenticated, DealController.fetchDeals);
  app.get('/deals/new', isAuthenticated, DealController.fetchNewDeals);
  app.get('/deals/nearby', isAuthenticated, DealController.fetchDealsNearby);
  app.get('/deals/:categoryName', isAuthenticated, DealController.fetchDealsByCategory);
  app.get('/deals/:dealId', isAuthenticated, DealController.fetchDealById);
}