const express = require('express')
const {auth,authorizRoles} = require('../middleware/global/auth');
const {
    validUserData,
    saveNewUserToDb,
    generateAuthToken,
    findUserCredentials,
    validUserDataWithRole
} = require('../middleware/user')

const router = new express.Router();

router.post("/users",auth,authorizRoles(),validUserDataWithRole,saveNewUserToDb,(req, res) => {
    res.status(200).send({ status:"Success register new user" });
})

router.post("/users/login",validUserData,findUserCredentials,generateAuthToken,(req, res) => {
    res.status(200).send({ token:req.token });
})



module.exports = router;