// retour.post("/users/login");
// router.get("/users/logout");
// router.post("/users/forgout-password");
// router.post("/users//reset-password/:id/:token");
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
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const newUser = await this.loginUserUseCase.execute({
        email,
        password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], (err, data) => {
      if (err) {
        return res.json({ Error: "Login error" });
      }
      if (data.length > 0) {
        bcrypt.compare(
          req.body.password.toString(),
          data[0].password,
          (err, response) => {
            if (err) return res.json({ Error: "Pass compare error" });

            if (response) {
              const name = data[0].name;
              const token = jwt.sign({ name }, "jwt-secret-key", {
                expiresIn: "1d",
              });
              res.cookie("token", token);
              return res.json({ status: 200 });
            } else {
              return res.json({ Error: "pass no matched" });
            }
          }
        );
      } else {
        return res.json({ Error: "No email existed" });
      }
    });
  }
}
