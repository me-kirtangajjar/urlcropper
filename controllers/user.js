const User = require("../models/user");
const { setUser } = require("../service/auth");

const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    await User.create({ firstName, lastName, email, password });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, Try again later" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.render("login", { error: "Invalid email or password" });
    }

    const token = setUser(user._id);
    res.cookie("uid", token);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Something went wrong, Try again later" });
  }
};

module.exports = { userRegister, userLogin };
