const express = require("express");
const route = express.Router();
const categoryController = require("../controller/categoryController");

route.get("/", categoryController.getAll);
route.get("/:Id", categoryController.getOneCate);
route.post("/add", categoryController.addCategory);
route.put("/update/:Id", categoryController.updateCate);
route.delete("/remove/:Id", categoryController.removeCate);
module.exports = route;