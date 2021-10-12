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
    } else if (argv.add === "director") {
        await Director.create({name: argv.name})
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

const remove = async ({remove, id}) => {
    if (remove === "director") {
        await Director.destroy({where: {id}});
    } else if (remove === "movie") {
        await Movies.destroy({where: {id}});
    }  else if (remove === "show") {
        await Shows.destroy({where: {id}});
    } 
}
const update = async ({update, id, name, title, genre, runtime}) => {
    if (update === "director") {
        const dir = await Director.findByPk(id);
        await Director.update({name: name || dir.name}, {where: {id}});
    } else if (update === "movie") {
        const aMovie = await Movies.findByPk(id);
        await Movies.update({title: title || aMovie.title, genre: genre || aMovie.genre, runtime: rumetime || aMovie.runtime, id: id || aMovie.DirectorID}, {where: {id}});
    }
}
module.exports = {update, add, remove, list};



// const remove = async (id) => await Entry.destroy({where: { id } });

// const update = async (id, title, type, genre) => {
//     const entry = Entry.findAll({where: {id}});
//     await Entry.update({
//         title: title || entry.title,
//         type: type || entry.type,
//         genre: genre || entry.genre,
//     }, {
//         where: {id}
//     });
// };



