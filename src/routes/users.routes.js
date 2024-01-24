const { Router } = require("express");
const UsersController = require("../controllers/usersController")
const usersRoutes = Router();

const usersController = new UsersController();
usersController.post("/", usersController.create);

module.exports = usersRoutes;