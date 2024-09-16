import User from "../../domain/models/User.js";

export default class SequelizeRepository {
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error("Error retrieving users");
    }
  }

  async createUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
}
