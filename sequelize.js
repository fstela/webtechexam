const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://mjwicmmbslamog:5496ba9ea2a2d2ddd82ad4c2926663dc702d54ca6103bf9fee8d72322da5ccc2@ec2-3-222-49-168.compute-1.amazonaws.com:5432/d7u25ruscvof8n",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .sync()
  .then(function () {})
  .then(console.log("Synced."));
module.exports = sequelize;
