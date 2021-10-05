const express = require('express')
const {auth,authorizRoles} = require('../middleware/global/auth');
const roles = require('../data/roles.json');
const {dataValidtion,sendDataToPbx} = require('../middleware/simCharge');



const router = new express.Router();

router.post("/sim-charge",auth,authorizRoles(roles.SIM_CHARGE_USER),dataValidtion,sendDataToPbx,(req, res) => {
    res.status(200).send({ status:"Success" });
})


module.exports = router;