const shortid = require("shortid");
const Url = require("../models/url");

const handleCreateShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortId = shortid.generate();

    await Url.create({
      shortId: shortId,
      originalUrl: url,
    });

    // return res.render("home", { shortId: shortId });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, Try again later" });
  }
};

const handleShortId = async (req, res) => {
  try {
    const shortId = req.params.id;

    const shortUrl = await Url.findOne({ shortId });
    shortUrl.clicks++;
    shortUrl.save();

    return res.redirect(shortUrl.originalUrl);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, Try again later" });
  }
};

module.exports = { handleCreateShortUrl, handleShortId };
