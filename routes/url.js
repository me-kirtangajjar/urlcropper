const router = require("express").Router();
const Url = require("../models/url");
const { handleShortId, handleCreateShortUrl } = require("../controllers/url");

router.get("/", async (req, res) => {
  const urls = await Url.find();
  return res.render("home", { shortUrls: urls });
});
router.get("/:id", handleShortId);
router.post("/shortUrls", handleCreateShortUrl);

module.exports = router;
