import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
const salt = 10;

const sequelize = new Sequelize("logincode043;", "postgres", "dev", {
  host: "http://localhost;",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
const User = sequelize.define("login", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

const varifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};
app.get("/", varifyUser, (req, res) => {
  return res.json({ status: 200, name: req.name });
});
app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing pass" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data error" });
      return res.json({ status: 200 });
    });
  });
});
app.post("/login", (req, res) => {
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
});
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: 200 });
});
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    console.log(data);
    if (!data) {
      return res.send({ status: "User nao exist" });
    }
    let user_id = data[0].id;
    const token = jwt.sign({ id: user_id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ea64b87bca5ece",
        pass: "574f1f902b58ac",
      },
    });
    const mailOptions = {
      from: "info@mailtrap.com",
      to: "test@gmail.com",
      subject: "Link para resetar sua senha",
      text: `<a href="http://localhost:5173/reset-password/${user_id}/${token}">Click here</a>`,
      html: `<a href="http://localhost:5173/reset-password/${user_id}/${token}">Click here</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      console.log(info);
      if (err) {
        console.log("Erro de evio ");
      } else {
        return res.send({ status: 200 });
      }
    });
  });
});
app.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ status: "Error with token" });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.json({ Error: "Error for hashing pass" });

        const sql = "UPDATE login SET password = ? WHERE id = ?";
        db.query(sql, [hash, req.params.id], (err, result) => {
          if (err) return res.json({ Error: "Inserting data error" });
          return res.json({ status: 200 });
        });
      });
    }
  });
});
app.listen(8081, () => {
  console.log("Server running");
});
