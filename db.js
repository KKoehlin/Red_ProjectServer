const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:Choir92!@localhost:5432/red-project");


module.exports = sequelize;
