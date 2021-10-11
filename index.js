require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { connection } = require("./connection");
const { Entry } = require("./models")
const argv = yargs(hideBin(process.argv)).argv;
const { update, add, remove, list } = require("./src/app.js")

const main = async () => {
    try {
        await connection.authenticate();
        await Entry.sync({alter: true});
        console.log(`Connection to ${process.env.DB_HOST} established`);

        if (argv.add) {
            await add(argv.title, argv.type, argv.genre);
        } else if (argv.list) {
            await list()
        } else if (argv.remove) {
            await remove(argv.id);
        } else if (argv.update) {
            await update(argv.id, argv.title, argv.type, argv.genre);
        }
        await connection.close();
    }catch(error) {
        console.error(`Unable to connect to the DB: ${error}`);
    }
    process.exit();
};
main();