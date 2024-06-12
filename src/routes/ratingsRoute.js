const express = require("express");
const route = express.Router();
const ratingsController = require("../controller/ratingsController");

route.get("/count/:userId", ratingsController.countLearnedVocabulary);
route.get("/result/:userId", ratingsController.calculateRank);
module.exports = route;
