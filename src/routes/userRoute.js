const userController = require("../controller/UserController");
const express = require('express');
const route = express.Router();

route.get("/", userController.getAllUser);
route.get("/:Id", userController.getOneUser);

module.exports = route