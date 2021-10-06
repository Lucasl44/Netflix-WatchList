const fs = require("fs");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid");

const dataPath = path.join(process.env.DATA_LOCATION, "netflix.json");

const saveData = (data) => {
    try {
        if (!fs.existsSync(process.env.DATA_LOCATION)) {
            fs.mkdirSync(process.env.DATA_LOCATION);
        }
        fs.writeFileSync(dataPath, JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
};

const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataPath).toString());
    } catch(error) {
        return [];
    }
}
const makeID = () => {
    return customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();
};

const add = (type, title, id = false, watched = false) => {
    saveData([...loadData(), {id: id || makeID(), type: type, title: title, watched}]);
};

const list = () => {
    console.log(loadData());
}

const del = (id) => {
    const data = loadData();
    const d = data.find((d) => d.id == id);
    const matchData = (d) => d.id !== id;
    saveData(data.filter(matchData)); 
    return d;
};

const update = (id, type, title) => {
    const data = del(id);
    add(type || data.type, title || data.title, id);
}

const watched = (id) => {
    const data = loadData();
    const d = data.find((element) => element.id === id);
    // wprk on turning watched to true
       
}

module.exports = {add, list, del, update, watched};

