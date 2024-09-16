export default class UserController {
  constructor(registerUserUseCase, getUsersUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.getUsersUseCase = getUsersUseCase;
  }
  async getAllUsers(req, res) {
    try {
      const users = await this.getUsersUseCase.execute();
      console.log(users);
      res.json(users);
    } catch (error) {}
  }
  async registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
      const newUser = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
