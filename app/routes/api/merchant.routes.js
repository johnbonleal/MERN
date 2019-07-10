const MerchantController = require("../../controllers/merchant.controllers");

module.exports = (app, isAuthenticated) => {
  app.post("/merchants", isAuthenticated, MerchantController.addMerchant);
  app.get("/merchants", isAuthenticated, MerchantController.fetchMerchants);
  app.get(
    "/merchants/new",
    isAuthenticated,
    MerchantController.fetchNewMerchants
  );
  app.get(
    "/merchants/nearby",
    isAuthenticated,
    MerchantController.fetchNearbyMerchants
  );
  app.get(
    "/merchants/:id",
    isAuthenticated,
    MerchantController.fetchMerchantById
  );
};
