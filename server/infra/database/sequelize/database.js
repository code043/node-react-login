import { Sequelize } from "sequelize";

const sequelize = new Sequelize("user_login", "postgres", "dev", {
  host: "192.168.128.2",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
export default sequelize;
