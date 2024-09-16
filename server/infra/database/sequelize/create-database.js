import pkg from "pg";
const { Client } = pkg;

export const createDatabase = async () => {
  const client = new Client({
    user: "postgres",
    host: "192.168.128.2",
    password: "dev",
    port: 5432,
  });

  try {
    await client.connect();
    await client.query("CREATE DATABASE user_login");
    console.log("Banco de dados criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar o banco de dados:", err);
  } finally {
    await client.end();
  }
};
