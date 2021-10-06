require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const { add, list, del } = require("./src/app.js")

const main = () => {
    if (argv.add) {
        add(argv.type, argv.title);
    } else if (argv.list) {
        list();
    } else if (argv.delete) {
        del(argv.id, argv.title);
    }
};
main();