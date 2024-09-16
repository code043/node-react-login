export default class MemoryDatabase {
  userList = [];
  constructor() {
    this.userList = [
      {
        id: 1,
        name: "Joe Doe",
        email: "email.com",
        password: "123",
      },
    ];
  }
  async createUser(user) {
    try {
      const newUser = {
        id: this.userList.length + 1,
        ...user,
      };
      await this.userList.push(newUser);
      return user;
    } catch (error) {}
  }
  async getAllUsers() {
    try {
      return this.userList;
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
}
