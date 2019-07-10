const Terms = require("../db/models/Terms.model");

exports.addTerms = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  Terms.findOne({ name: body.name }).then(Terms => {
    if (Terms) {
      return res.status(400).json({ status: 400, message: "Terms already exists" })
    } else {
      const newTerms = new Terms(body);
      newTerms
        .save()
        .then(Terms => res.json({ status: 200, data: Terms, message: "Terms created successfully"}))
        .catch(err => console.log(err));
    }
  })
};

exports.fetchTerms = (req, res, next) => {
  Terms.find()
    .then(terms => {
      res.send(terms);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving data."
      });
    });
};

// Find a single Terms with a TermsId
exports.fetchTermsById = (req, res) => {
  Terms.findById(req.params.TermsId)
    .then(Terms => {
      if (!Terms) {
        return res.status(404).send({
          message: "Terms not found with id " + req.params.TermsId
        });
      }
      res.send(Terms);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Terms not found with id " + req.params.TermsId
        });
      }
      return res.status(500).send({
        message: "Terms retrieving Terms with id " + req.params.TermsId
      });
    });
};