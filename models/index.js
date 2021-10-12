const { DataTypes } = require("sequelize");
const { connection } = require("../connection");

// new model created

const Director = connection.define("Director", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexes: [{unique: true, fields: ["name"]}]
});

const Movies = connection.define("Movies", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    runtime: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, { });

const Shows = connection.define("Shows", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    seasons: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { });
Movies.belongsTo(Director, {onDelete: "cascade"});
Shows.belongsTo(Director, {onDelete: "cascade"});

module.exports = { Director, Movies, Shows };
