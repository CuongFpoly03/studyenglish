const express = require("express");
const route = express.Router();
const favoriteController = require("../controller/favoriteController");

route.get("/", favoriteController.getAll);
route.get("/:Id", favoriteController.getOneFavorite);
route.post("/add", favoriteController.addFavorite);
route.post("/log", favoriteController.logFavorite);
route.put("/update/:Id", favoriteController.updateFavorite);
route.delete("/remove/:Id", favoriteController.removeFavorite);
module.exports = route;
