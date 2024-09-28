const jwt = require("jsonwebtoken");

const setUser = (userId) => {
  return jwt.sign({ userId }, process.env.JWTTOKEN, {
    expiresIn: "30D",
  });
};

const getUser = (token) => {
  return jwt.verify(token, process.env.JWTTOKEN);
};

module.exports = { setUser, getUser };
