const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: { msg: "Email is invalid." } },
    },
    password: DataTypes.STRING,
  });

  Model.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function (pw) {
    if (!this.password) {
      console.err("Password not set");
    }

    return await bcrypt.compare(pw, this.password);
  };

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(process.env.JWT_EXPIRATION);
    return jwt.sign({ user_id: this.id }, process.env.JWT_ENCRYPTION, {
      expiresIn: expiration_time,
    });
  };

  return Model;
};
