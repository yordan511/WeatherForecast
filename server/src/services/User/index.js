const validator = require("email-validator");
const { User } = require("../../models");

const authUser = async function (userInfo) {
  //returns token
  let user;

  if (!userInfo.password) TE("Please enter a password to login");

  if (validator.validate(userInfo.email)) {
    user = await User.findOne({ where: { email: userInfo.email } });
  } else {
    throw "A valid email was not entered";
  }

  if (!user) {
    console.log("Not registered");
  }

  const isPasswordMatching = await user.comparePassword(userInfo.password);

  if (!isPasswordMatching) {
    throw "Password is not valid";
  }

  return user;
};

module.exports = {
  authUser,
};
