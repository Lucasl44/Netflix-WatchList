const { Entry } = require("../models");

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

const add = async (title, type, genre) => {
    await Entry.create({
        title,
        type,
        genre
    });
};

const remove = async (id) => await Entry.destroy({where: { id } });

const list = async () => {
    console.log("\n");
        for (entry of await Entry.findAll()) {
            console.log(`ID:\t${entry.id}`);
            console.log(`Title:\t${entry.title}`); 
            console.log(`Type:\t${entry.type}`);
            console.log(`Genre:\t${entry.genre}`);
            console.log("\n");
        }
}
    

module.exports = {update, add, remove, list};

