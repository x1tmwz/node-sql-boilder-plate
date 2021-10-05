const config = require('config');
const app = require('./app');
const setupDb = require('./db/setup');

const port = config.get("port");


try{
    setupDb().then(()=>{
        app.listen(port, function(){
            console.log("server start on port " + port);
        });
    })
}catch(e){
    console.error(e)
}



