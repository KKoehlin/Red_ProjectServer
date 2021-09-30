const { DataTypes } = require("sequelize");
const db = require("../db");

const Profile = db.define("profile", {
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
            max: 110,
            min: 21
        },
        hometown: {
            type: DataTypes.STRING,
            allowNull: true
        },
        favbev: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        wishlist: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        owner_id: {
            type: DataTypes.INTEGER
        }
    })


module.exports = Profile; 