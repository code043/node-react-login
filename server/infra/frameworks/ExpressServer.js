import express from "express";

export default class ExpressServer {
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  addRoutes(routeSetup) {
    const router = express.Router();
    routeSetup(router);
    this.app.use(router);
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
