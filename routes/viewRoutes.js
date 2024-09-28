const router = require("express").Router();
const Url = require("../models/url");
const { checkAuth } = require("../middlewares/auth");

// User
router.get("/register", (req, res) => {
  return res.render("register");
});
router.get("/login", (req, res) => {
  return res.render("login");
});

// Url
router.get("/", checkAuth, async (req, res) => {
  const userUrls = await Url.find({ createdBy: req.userId });
  return res.render("home", {
    shortUrls: userUrls,
    baseUrl: `${req.protocol}://${req.get("host")}`,
  });
});

module.exports = router;
