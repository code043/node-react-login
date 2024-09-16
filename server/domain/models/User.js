import { DataTypes } from "sequelize";
import sequelize from "../../infra/database/sequelize/database.js"; // Ajuste o caminho conforme necessário

// Define o modelo User
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Exporta o modelo User
export default User;

// Sincroniza o modelo com o banco de dados
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tabelas criadas ou sincronizadas com sucesso.");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar tabelas:", err);
  });
