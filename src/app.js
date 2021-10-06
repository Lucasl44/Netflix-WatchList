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

const add = (type, title, id = false) => {
    saveData([...loadData(), {id: id || makeID(), type: type, title: title}]);
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

const update = () => {

}

module.exports = {add, list, del, update};
// currently adds input data to a text file saved on desktop, with an id, type (movie or show), and the title, still need to update them.
