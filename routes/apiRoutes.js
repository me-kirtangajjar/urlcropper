const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth");
const { userRegister, userLogin } = require("../controllers/user");
const { handleShortId, handleCreateShortUrl } = require("../controllers/url");

// User
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", (req, res) => {
  res.clearCookie("uid");
  return res.redirect("/");
});

// Url
router.get("/:id", handleShortId);
router.post("/shortUrls", checkAuth, handleCreateShortUrl);

module.exports = router;
