const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

const Entry = connection.define("Netflix", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
         indexes: [{unique: true, fields: ["title"]}]
    
});

module.exports = { Entry };