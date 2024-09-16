import pkg from "pg";
const { Client } = pkg;

export const createDatabase = async () => {
  const client = new Client({
    user: "postgres",
    host: "node-react-login-db",
    password: "dev",
    port: 5432,
  });

  try {
    await client.connect();
    console.log("conect");
    await client.query("CREATE DATABASE user_db");
    console.log("Banco de dados criado com sucesso.");
  } catch (err) {
    console.error("Erro ao criar o banco de dados......:", err);
  } finally {
    await client.end();
  }
};

//createDatabase();
