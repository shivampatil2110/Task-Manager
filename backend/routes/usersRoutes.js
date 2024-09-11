const express = require("express");
const {
  signUp,
  userInfo,
  login,
  logout,
  updatePassword,
} = require("../controller/authentication");
const { auth } = require("../db/redis");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("/signUp", signUp);
router.get("/user", checkAuth, userInfo);
router.post("/login", login);
router.delete("/logout", logout);
router.patch("/updatePassword", checkAuth, updatePassword);

module.exports = router;
