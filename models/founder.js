const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Founder = sequelize.define("Founders", {
  FounderID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },

  CompanyID: {
    type: DataTypes.INTEGER,
    references: { model: "Companies", key: "CompanyID" },
    allowNull: true,
  },

  Name: {
    type: DataTypes.STRING,
    validate: {
      len: [5, 255],
    },
    allowNull: false,
  },

  Role: {
    type: DataTypes.ENUM("CEO", "CTO", "COO", "CFO"),
  },
});

module.exports = Founder;
