require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const { add, list, del, update, watched } = require("./src/app.js")

const main = () => {
    if (argv.add) {
        add(argv.type, argv.title);
    } else if (argv.list) {
        list();
    } else if (argv.delete) {
        del(argv.id);
    } else if (argv.update) {
        update(argv.id, argv.type, argv.title);
    } else if (argv.watched) {
        watched(argv.id);
    }
};
main();