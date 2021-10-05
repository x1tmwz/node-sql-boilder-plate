const bcrypt = require('bcryptjs');
const User = require('../db/models/User');
const  sqlHelperFunctions = require('../utils/sqlHelperFunctions');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const roles = require('../data/roles.json')
const config =require('config');
const userModel = new User();


function validUserData(req,res,next){
    if(!req.body.password || !req.body.userName){
        next(new ApiError('400','User name or password is missing'))
    }
    next();
}
function validUserDataWithRole(req,res,next){
    if(!req.body.password || !req.body.userName || !req.body.role){
        next(new ApiError('400','User name or password or role is missing'))
    }
    if(req.body.role === roles.ADMIN){
        next(new ApiError('400','you cant set this role'))
    }
    next();
}

async function saveNewUserToDb(req,res,next){
    const password = await bcrypt.hash(req.body.password, 8);
    const role = req.body.role ? req.body.role :0 
    await userModel.insert(sqlHelperFunctions.createQueryForInsert({password,userName:req.body.userName,role}));
    next();
}
async function findUserCredentials(req,res,next){
        const user = (await userModel.get(sqlHelperFunctions.createQueryForWhere({userName:req.body.userName})))[0][0]
        if(!user){
          return next(new ApiError(400,"User name is not exitis"))
        }
        const isMatchPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isMatchPassword){
           return next(new ApiError(400,"Unbale To login"))
        }
        req.user= user;
        next()
}
function generateAuthToken(req,res,next){
    req.token = jwt.sign({id:req.user.id,role:req.user.role},config.get('secretKey'),{expiresIn:'6h'})
    next();
}



module.exports = {
    validUserData,
    saveNewUserToDb,
    generateAuthToken,
    findUserCredentials,
    validUserDataWithRole
}