const express = require("express");
const bodyParser = require("body-parser");
const ReplayController = require("../controller/replayController");

class ReplayRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.ReplayController = new ReplayController();
    this.initRoutes();
  }
  initRoutes() {
    this.router.get(
      "/",
      this.ReplayController.getAllReplay.bind(this.ReplayController)
    );
    this.router.post(
      "/",
      this.ReplayController.createReplay.bind(this.ReplayController)
    );
    this.router.delete(
      "/:id",
      this.ReplayController.deleteReplay.bind(this.ReplayController)
    );
  }
  getRouter() {
    return this.router;
  }
}
module.exports = ReplayRouter;
