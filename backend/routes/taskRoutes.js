const express = require("express");
const {
  getAllTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/", checkAuth, getAllTask);
router.post("/", checkAuth, addTask);
router.patch("/:id", checkAuth, updateTask);
router.delete("/:id", checkAuth, deleteTask);

module.exports = router;
