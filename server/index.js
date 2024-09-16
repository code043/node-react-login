import ExpressServer from "./infra/frameworks/ExpressServer.js";
import { userController } from "./interface_adapter/adapter.js";
import userRoutes from "./interface_adapter/rotas/userRoutes.js";
import { createDatabase } from "./infra/database/sequelize/create-database.js";
createDatabase();
const server = new ExpressServer();

server.addRoutes((router) => userRoutes(router, userController));

server.start(3000);
