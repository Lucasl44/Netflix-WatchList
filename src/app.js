const { Director, Movies, Shows } = require("../models");

const add = async(argv) => {
    if (argv.add === "show") {
        let pk = await Director.findOne({where: {name: argv.director }});
        if (pk === null) {
            await Director.create({name: argv.director});
            pk = await Director.findOne({where: {name: argv.director }});
        };
        await Shows.create({title: argv.title, genre: argv.genre, seasons: argv.seasons, DirectorId: pk.id});
    } else if (argv.add === "movie") {
        let pk = await Director.findOne({where: {name: argv.director }});
        if (pk === null) {
            await Director.create({name: argv.director});
            pk = await Director.findOne({where: {name: argv.director }});
        };
        await Movies.create({title: argv.title, genre: argv.genre, runtime: argv.runtime, DirectorId: pk.id});
    }
}

const list = async ({list}) => {
    let results = [];
    if (list === "directors") {
        results = await Director.findAll({attributes: ["id", "name"]});
    } else if (list === "movies") {
        results = await Movies.findAll({attributes: ["id", "title", "genre", "runtime", "DirectorID"]});
    } else if (list === "shows") {
        results = await Shows.findAll({attributes: ["id", "title", "genre", "seasons", "DirectorID"]});
    }
    console.table(results.map(result => result.dataValues))
}

module.exports = {update, add, remove, list};

const update = async (id, title, type, genre) => {
    const entry = Entry.findAll({where: {id}});
    await Entry.update({
        title: title || entry.title,
        type: type || entry.type,
        genre: genre || entry.genre,
    }, {
        where: {id}
    });
};


const remove = async (id) => await Entry.destroy({where: { id } });
    



