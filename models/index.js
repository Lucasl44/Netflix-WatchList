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
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    runtime: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    indexes: [{unique: true, fields: ["title", "DirectorID" ]}]
});

const Shows = connection.define("Shows", {
    title: {
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
}, { 
    indexes: [{unique: true, fields: ["title", "DirectorID" ]}]
});

const Genres = connection.define("Genres", {
    genre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    indexes: [{unique: true, fields: ["genre"]}]
});

Movies.belongsTo(Director, {onDelete: "cascade"});
Shows.belongsTo(Director, {onDelete: "cascade"});
// Movies.belongsTo(Genres); 
// Shows.belongsTo(Genres); 

module.exports = { Director, Movies, Shows, Genres };
