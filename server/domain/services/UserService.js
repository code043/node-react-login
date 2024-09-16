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
}
