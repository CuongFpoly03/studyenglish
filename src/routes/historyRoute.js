const express = require("express");
const route = express.Router();
const historyController = require("../controller/historyController");

route.get("/", historyController.getAll);
route.get("/:Id", historyController.getOneHistory);
route.post("/add", historyController.addHistory);
route.post("/log", historyController.logEvent);
route.get("/count/:userId", historyController.countLearnedVocabulary);
route.put("/update/:Id", historyController.updateHistory);
route.delete("/remove/:Id", historyController.removeHistory);
module.exports = route;
