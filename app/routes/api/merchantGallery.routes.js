const MerchantGallery = require("../../controllers/merchantGallery.controllers");

module.exports = (app, isAuthenticated) => {
  app.post(
    "/merchants/galleries",
    isAuthenticated,
    MerchantGallery.addMerchantGallery
  );
  app.get("/merchants/galleries", isAuthenticated, MerchantGallery.fetchMerchantGalleries);
  app.get(
    "/merchants/galleries/:id",
    isAuthenticated,
    MerchantGallery.fetchMerchantGalleryById
  );
};
