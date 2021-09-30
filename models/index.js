//const sequelize = require('../db');
//const { DataTypes } = require('sequelize');

const PostModel = require('./Post');
const UserModel = require("./User");
const ProfileModel = require("./Profile");
const sequelize = require('../db');

// const User = UserModel(sequelize, DataTypes)
// const Post = PostModel(sequelize, DataTypes)
// const Profile = ProfileModel(sequelize, DataTypes)

UserModel.hasMany(PostModel)
PostModel.belongsTo(UserModel)

UserModel.hasOne(ProfileModel, {
    onDelete: "CASCADE"
}); 
ProfileModel.belongsTo(UserModel);

sequelize.sync({alter: true})

module.exports = { 
    PostModel, 
    UserModel,
    ProfileModel
}; 
