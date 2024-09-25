const shortid = require("shortid");
const Url = require("../models/url");

const handleCreateShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortUrlCode = shortid.generate();

    await Url.create({
      shortId: shortUrlCode,
      originalUrl,
    });

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
    const { id: shortUrlId } = req.params;

    const shortenedUrl = await Url.findOneAndUpdate(
      { shortId: shortUrlId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!shortenedUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(shortenedUrl.originalUrl);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, Try again later" });
  }
};

module.exports = { handleCreateShortUrl, handleShortId };
