const BranchController = require('../../controllers/branch.controllers');

module.exports = (app, isAuthenticated) => {
  app.post('/branches/register', isAuthenticated, BranchController.addBranch);
  app.get('/branches', BranchController.fetchBranches);
  app.get('/branches/new', isAuthenticated, BranchController.fetchNewBranches);
  app.get('/branches/nearby', isAuthenticated, BranchController.fetchNearbyBranches);
  app.get('/branches/:id', isAuthenticated, BranchController.fetchBranchById);
}