require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { connection } = require("./connection");
const { Director, Shows, Movies, Genres } = require("./models");
const { update, add, remove, list } = require("./src/app.js");

const argv = yargs(hideBin(process.argv)).argv;

const main = async () => {
    try {
        await connection.authenticate();
        await Director.sync({alter: true});
        await Shows.sync({alter: true});
        await Movies.sync({alter: true});
        await Genres.sync({alter: true});

        console.log(`Connection to ${process.env.DB_HOST} established`);

        if (argv.add) {
            await add(argv, argv.genre);
        } else if (argv.list) {
            await list(argv)
        } else if (argv.remove) {
            await remove(argv);
        } else if (argv.update && argv.id) {
            await update(argv);
        }

        await connection.close();

    }catch(error) {
        console.error(`Unable to connect to the DB: ${error}`);
    }
    process.exit();
};
main();