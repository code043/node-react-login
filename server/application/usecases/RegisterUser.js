class RegisterUser {
  userService;
  constructor(service) {
    this.userService = service;
  }
  async execute(user) {
    const userCreated = await this.userService.createUser(user);
    console.log("user return register: ", userCreated);
    return userCreated;
  }
}
export default RegisterUser;
