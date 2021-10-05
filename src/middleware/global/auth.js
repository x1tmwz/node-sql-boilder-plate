const jwt = require('jsonwebtoken');
const ApiError = require('../../error/ApiError');
const roles = require('../../data/roles.json')
const config =require('config');


const auth=(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, config.get('secretKey'));
        if (!user) throw new Error();
        req.decoded = decoded;
        next();
    } catch (e) {
        next(new ApiError(401,'please authenticate'))
    }
}
const authorizRoles =(authorizRoles)=>{
    authorizRoles = Array.isArray(authorizRoles)?authorizRoles:[authorizRoles];
    return (req,res,next)=>{
        if(req.decoded.role === roles.ADMIN){
            next();
            return;
        }
        const isAuthoriz =authorizRoles.includes(req.decoded.role);
        if(isAuthoriz){
            next();
            return;
        }
        next(new ApiError(401,'Your role is not good for this request'))
    }
}



module.exports = {auth,authorizRoles}