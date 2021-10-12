require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { connection } = require("./connection");
const { Director, Shows, Movies } = require("./models")
const argv = yargs(hideBin(process.argv)).argv;
const { update, add, remove, list } = require("./src/app.js")

const main = async () => {
    try {
        await connection.authenticate();
        await Director.sync({alter: true});
        await Shows.sync({alter: true});
        await Movies.sync({alter: true});

        console.log(`Connection to ${process.env.DB_HOST} established`);

        if (argv.add) {
            await add(argv);
        } else if (argv.list) {
            await list(argv)
        } else if (argv.remove && argv.id) {
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