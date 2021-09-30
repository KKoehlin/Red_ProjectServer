const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = User

