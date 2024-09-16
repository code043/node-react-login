import GetUsers from "../application/usecases/Getusers.js";
import RegisterUser from "../application/usecases/RegisterUser.js";
import { UserService } from "../domain/services/UserService.js";
import MemoryDatabase from "../infra/repositories/MemoryDatabase.js";
import SequelizeRepository from "../infra/repositories/SequelizeRepository.js";
import UserController from "./controllers/UserController.js";

const database = new MemoryDatabase();
const realDatabse = new SequelizeRepository();
const service = new UserService(realDatabse);

const usecaseRegister = new RegisterUser(service);
const getUsers = new GetUsers(service);

export const userController = new UserController(usecaseRegister, getUsers);
