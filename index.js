require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

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

const argv = yargs(hideBin(process.argv)).argv;
const { add, list, del, update } = require("./src/app.js")

const main = async () => {
    try {
        await connection.authenticate();
        await Entry.sync({alter: true});
        console.log(`Connection to ${process.env.DB_HOST} established`);

        if (argv.add) {
            const entry = Entry.build({title: argv.title, type: argv.type, genre: argv.genre});
            await entry.save();
        } else if (argv.list) {
            const entries = await Entry.findAll();
            for (entry of entries) {
                console.log(`ID:\t${entry.id}\nTitle:\t${entry.title}\nType:\t${entry.type}\nGenre:\t${entry.genre}\n\n`);
            }
        } else if (argv.remove) {
            await Entry.destroy({
                where: {
                    id: argv.id
                }
            });
        }
        await connection.close();
    }catch(error) {
        console.error(`Unable to connect to the DB: ${error}`);
    }
    process.exit();
};
main();