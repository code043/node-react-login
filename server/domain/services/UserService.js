import bcrypt from "bcrypt";

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw new Error("Error");
    }
  }
  async createUser(user) {
    const salt = 10;

    try {
      if (user.password < 2) throw new Error("Password must has 3 characters!");
      const hash = bcrypt.hashSync(user.password.toString(), salt);

      const registeredUser = await this.userRepository.createUser({
        ...user,
        password: hash,
      });
      return registeredUser;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
  async loginUser(user) {}
  async logoutUser(user) {}
  async forgoutPassword(user) {}
  async resetPassword(user) {}
}
// retour.post("/users/login");
// router.get("/users/logout");
// router.post("/users/forgout-password");
// router.post("/users//reset-password/:id/:token");
