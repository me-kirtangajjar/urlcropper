const { getUser } = require("../service/auth");

const checkAuth = (req, res, next) => {
  const uId = req.cookies.uid;
  if (!uId) {
    return res.redirect("/login");
  }

  const user = getUser(uId);
  if (!user) return null;

  req.userId = user.userId;
  next();
};

module.exports = { checkAuth };
