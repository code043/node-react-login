import GetUsers from "../application/usecases/Getusers";
import RegisterUser from "../application/usecases/RegisterUser";
import { UserService } from "../domain/services/UserService";
import MemoryDatabase from "../infra/repositories/MemoryDatabase";
test("Should register an user", async () => {
  const database = new MemoryDatabase();
  const service = new UserService(database);
  const usecaseRegister = new RegisterUser(service);
  const getUsers = new GetUsers(service);
  await usecaseRegister.execute({
    name: "Joe Doe",
    email: "email.com",
    password: "123",
  });
  const users = await getUsers.execute();

  expect(users[0].id).toBeDefined();
  expect(users[0].name).toBe("Joeh");
});
test.skip("Should register an user with valid email", async () => {
  const database = m;
  const usecaseRegister = new RegisterUser(database);
  const getUsers = new GetUsers(database);
  await usecaseRegister.execute({
    name: "Joeh",
    email: "email",
    password: "123",
  });
  const users = await getUsers.execute();
  expect(users[1].id).toBeDefined();
  expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(users[1].email)).toBeTruthy();
});
