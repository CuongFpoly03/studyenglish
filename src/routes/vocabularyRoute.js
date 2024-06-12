const express = require("express");
const route = express.Router();
const vocabularyController = require("../controller/vocabularyController");

route.get("/", vocabularyController.getAll);
route.get("/:Id", vocabularyController.getOneVocabulary);
route.post("/add", vocabularyController.addVocabularygory);
route.put("/update/:Id", vocabularyController.updateVocabulary);
route.delete("/remove/:Id", vocabularyController.removeVocabulary);
module.exports = route;
