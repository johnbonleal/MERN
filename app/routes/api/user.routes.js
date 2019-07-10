const passport = require("passport");
const UserController = require("../../controllers/user.controllers");

module.exports = (app, isAuthenticated) => {
  app.post("/auth/sign_up", UserController.enrollUser);
  app.post("/auth/sign_in", UserController.loginUser);
  app.get("/users", isAuthenticated, UserController.fetchUsers);
  app.get("/users/:id", isAuthenticated, UserController.fetchUserById);
  app.put("/users/:id", isAuthenticated, UserController.update);
  app.delete("/users/:id", isAuthenticated, UserController.delete);
  app.post(
    "/users/change_password",
    isAuthenticated,
    UserController.changePassword
  );
};
