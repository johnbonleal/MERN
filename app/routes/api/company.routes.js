const CompanyController = require('../../controllers/company.controllers');

module.exports = (app, isAuthenticated) => {
  app.post('/companies/register', isAuthenticated, CompanyController.addCompany);
  app.get('/companies', isAuthenticated, CompanyController.fetchCompanies);
  app.get('/companies/:companyId', isAuthenticated, CompanyController.fetchCompanyById);
}