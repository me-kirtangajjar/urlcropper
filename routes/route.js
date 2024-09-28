const router = require("express").Router();
const Url = require("../models/url");
const { checkAuth } = require("../middlewares/auth");
const { userRegister, userLogin } = require("../controllers/user");
const { handleShortId, handleCreateShortUrl } = require("../controllers/url");

// User
router.get("/register", (req, res) => {
  return res.render("register");
});
router.post("/api/register", userRegister);
router.get("/login", (req, res) => {
  return res.render("login");
});
router.post("/api/login", userLogin);
router.get("/api/logout", (req, res) => {
  res.clearCookie("uid");
  return res.redirect("/");
});

// Url
router.get("/", checkAuth, async (req, res) => {
  const userUrls = await Url.find({ createdBy: req.userId });
  return res.render("home", {
    shortUrls: userUrls,
    baseUrl: `${req.protocol}://${req.get("host")}`,
  });
});
router.get("/:id", handleShortId);
router.post("/shortUrls", checkAuth, handleCreateShortUrl);

module.exports = router;
