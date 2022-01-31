const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Company = sequelize.define("Companies", {
  CompanyID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },

  Name: {
    type: DataTypes.STRING,
    validate: {
      len: [3, 255],
    },
    allowNull: false,
  },

  FoundedDate: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Company;
