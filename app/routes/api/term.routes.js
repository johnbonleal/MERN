const passport = require("passport");
const TermsController = require("../../controllers/term.controllers");

module.exports = (app, isAuthenticated) => {
  app.post("/terms/add", isAuthenticated, TermsController.addTerms);
  app.get("/terms", isAuthenticated, TermsController.fetchTerms);
  app.get("/terms/:id", isAuthenticated, TermsController.fetchTermsById);
};
