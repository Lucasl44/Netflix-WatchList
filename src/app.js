// const { Sequelize } = require("../node_modules/sequelize/types")
const { Director, Movies, Shows, Genres } = require("../models");

const add = async(argv, genre) => {
    try {
        let gen = await Genres.findOne({where: {genre: argv.genre}});
        if (gen === null) {
            await Genres.create({genre: argv.genre, count: 1});
        } else {
            await Genres.increment("count", {where: {genre}});
            // await Genres.update({genre: genre, count: sequelize.literal("count + 1")}, {where: {genre}});
        }
    } catch (error) {
        console.log(error)
    }

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
    } else if (list === "genres") {
        results = await Genres.findAll({attributes:["genre", "count"]});
    }

    console.table(results.map(result => result.dataValues))
}

const remove = async ({remove, id}) => {
    if (remove === "all tables"){
        await Director.destroy({where: {}});
        await Movies.destroy({where: {}});
        await Shows.destroy({where: {}});
    } else if (remove === "director") {
        await Director.destroy({where: {id}});
    } else if (remove === "movie") {
        await Movies.destroy({where: {id}});
    }  else if (remove === "show") {
        await Shows.destroy({where: {id}});
    } else if (remove === "all directors") {
        await Director.destroy({where: {}});
    } else if (remove === "all movies") {
        await Movies.destroy({where: {}});
    } else if (remove === "all shows") {
        await Shows.destroy({where: {}});
    }
}
const update = async ({update, id, name, title, genre, runtime, seasons}) => {
    if (update === "director") {
        const dir = await Director.findByPk(id);
        await Director.update({name: name || dir.name}, {where: {id}});
    } else if (update === "movie") {
        const aMovie = await Movies.findByPk(id);
        await Movies.update({title: title || aMovie.title, genre: genre || aMovie.genre, runtime: runtime || aMovie.runtime, id: id || aMovie.id}, {where: {id}});
    } else if (update === "show") {
        const aShow = await Shows.findByPk(id);
        await Shows.update({title: title || aShow.title, id: id || aShow.id, seasons: seasons || aShow.seasons, genre: genre || aShow.genre}, {where: {id}});
    }
}
module.exports = {update, add, remove, list};




