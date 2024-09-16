const userRoutes = (router, userController) => {
  router.post("/users/register", (req, res) =>
    userController.registerUser(req, res)
  );
  router.get("/users", (req, res) => userController.getAllUsers(req, res));
  // retour.post("/users/login");
  // router.get("/users/logout");
  // router.post("/users/forgout-password");
  // router.post("/users//reset-password/:id/:token");
};
export default userRoutes;
