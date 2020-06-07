const { hashPassword } = require("../src/helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword("adminPassword1");
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@dev.com",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
