const { Router } = require("express");
const {
  getAllCategories,
  addCategories,
  getCategories,
  removeCategories,
} = require("../controllers/categories.controller");
const { authorize, auth } = require("../middlewares/auth");
const router = Router();
router
  .route("/")
  .get(getAllCategories)
  .post(auth, authorize("admin"), addCategories);
router
  .route("/:categoryId")
  .get(getCategories)
  .delete(auth, authorize("admin"), removeCategories);
module.exports = { router };
