const ApiError = require('../../error/ApiError');

module.exports = (err,req,res,next) =>{
    if(err instanceof ApiError){
        if(err.error){
            console.error(err.error);
        }
        res.status(err.status).send({ error: err.message,body:err.response });
        return;
    }
    if(err){
        console.error(err);
    }
    res.status(500).send({error:"somthing went wrong"})
}