const models = require("./models");

module.exports = () => {
  if (process.env.ENVIRONMENT === "dev") {
    models.sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to SQL database:", process.env.DB_USER);
      })
      .catch((err) => {
        console.error(
          "Unable to connect to SQL database:",
          process.env.DB_USER
        );
      });
    models.sequelize.sync();
    // models.sequelize.sync({ force: true });
  }
};
