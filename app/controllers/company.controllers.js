const Company = require("../db/models/company.model");

exports.addCompany = (req, res) => {
  const { body } = req;
  if (!body) {
    return res.status(400).json({
      message: "Content can not be empty"
    });
  }
  Company.findOne({ name: body.name }).then(company => {
    if (company) {
      return res.status(400).json({ status: 400, message: "Company already exists" })
    } else {
      const newCompany = new Company(body);
      newCompany
        .save()
        .then(company => res.json({ status: 200, data: company, message: "Company created successfully"}))
        .catch(err => console.log(err));
    }
  })
};

exports.fetchCompanies = (req, res) => {
  Company.find()
    .then(companies => {
      res.send(companies);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving data."
      });
    });
};

// Find a single company with a companyId
exports.fetchCompanyById = (req, res) => {
  Company.findById(req.params.companyId)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      res.send(company);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Company not found with id " + req.params.companyId
        });
      }
      return res.status(500).send({
        message: "Company retrieving company with id " + req.params.companyId
      });
    });
};