const path = require("path");
const fs = require("fs");

const normalizedPath = path.join(__dirname, 'models');

//this setup function will run when the server is active the function will look for models folder and check if model have init() and active it;
//init function could create a table if not exitis or insert relvant data when the server is active;
async function setup() {
    const modelsNames = fs.readdirSync(normalizedPath);
    for (let i = 0; i < modelsNames.length; i++) {
        if (modelsNames[i] === "BaseModel.js") {
            continue;
        }
        const model = require("./models/" + modelsNames[i]);
        const modelUse = new model();
        if (modelUse.init) {
            await modelUse.init();
        }
    }
}

module.exports=setup;

