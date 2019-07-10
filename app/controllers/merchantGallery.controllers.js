const MerchantGallery = require("../db/models/merchantGallery.model");

exports.addMerchantGallery = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  MerchantGallery.findOne({ name: body.name }).then(merchantGallery => {
    if (merchantGallery) {
      return res.status(400).json({ status: 400, message: "MerchantGallery already exists" })
    } else {
      const newMerchantGallery = new MerchantGallery(body);
      newMerchantGallery
        .save()
        .then(merchantGallery => res.json({ status: 200, data: merchantGallery, message: "MerchantGallery created successfully"}))
        .catch(err => console.log(err));
    }
  })
};

exports.fetchMerchantGalleries = (req, res) => {
  MerchantGallery.find()
    .then(merchantGalleries => {
      res.send(merchantGalleries);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving data."
      });
    });
};

// Find a single merchantGallery with a merchantGalleryId
exports.fetchMerchantGalleryById = (req, res) => {
  MerchantGallery.findById(req.params.merchantGalleryId)
    .then(merchantGallery => {
      if (!merchantGallery) {
        return res.status(404).send({
          message: "MerchantGallery not found with id " + req.params.merchantGalleryId
        });
      }
      res.send(merchantGallery);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "MerchantGallery not found with id " + req.params.merchantGalleryId
        });
      }
      return res.status(500).send({
        message: "MerchantGallery retrieving merchantGallery with id " + req.params.merchantGalleryId
      });
    });
};