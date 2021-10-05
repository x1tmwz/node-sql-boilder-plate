const express = require('express');
const route404 = require('./middleware/global/route404');
const apiErrorHandler = require('./middleware/global/apiErrorHandler');
const userRouter = require('./routers/user');
const simChargeRouter = require('./routers/simCharge');
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(simChargeRouter);
app.use(route404);
app.use(apiErrorHandler);


module.exports = app;