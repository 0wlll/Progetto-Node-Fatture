const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db_acl", "root", "", {
  host: "localhost",
  dialect: "mysql",
  password: "",
  port: 3306,
  logging: false,
});

// test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
