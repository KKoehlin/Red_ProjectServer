const { DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
    tripName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    travelPartner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tripPlan: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
});

module.exports = Post; 