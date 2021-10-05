const ApiError = require('../error/ApiError');
const functions = require('../utils/functions');
const validation = require('../utils/validation');
const pbxService = require('../service/pbx');


function dataValidtion(req, res, next) {
    //think how to better performance
    const numberList = req.body.numberList;
    const codeList = req.body.codeList;
    if (Array.isArray(numberList) || Array.isArray(codeList) || !req.body.suplier) {
        return next(new ApiError(400, 'Please check the data you send'))
    }
    if (numberList.length !== codeList.length || numberList.length > 500 || numberList.length === 0) {
        return next(new ApiError(400, 'Please make sure the lists are equal in size for each list to contain at least one row as a list can be up to 500 rows'))
    }
    const duplicatesNumbers = functions.getDuplicateValuesInArr(numberList);
    const duplicatesCodes = functions.getDuplicateValuesInArr(codeList);
    if (duplicatesNumbers.length > 0 || duplicatesCodes.length > 0) {
        return next(new ApiError(400, 'Please remove duplicates', { duplicatesNumbers, duplicatesCodes }));
    }
    const wrongNumbers = numberList.filter(number => !validation.isValidIsraeliPhoneNumber(number));
    if (wrongNumbers.length > 0) {
        return next(new ApiError(400, 'Please make sure that all telephone numbers are Israeli', { wrongNumbers }));
    }
    next()
}

async function sendDataToPbx(req, res, next) {
    const numbers = req.body.numberList;
    const codes = req.body.codeList;
    let reqList = [];
    try{
        for (let i = 0; i < numbers.length; i++) {
            reqList.push({ number: numbers[i], code: codes[i] });
            if (reqList.length === 10) {
               await Promise.allSettled(reqList.map(({number,code})=>pbxService.makeACall(req.body.suplier,number,code)));
               reqList=[]
            }
        }
        next()
    }catch(e){
        next(new ApiError('500','some thing went wrorg',{},e));
    }
}

module.exports = { dataValidtion, sendDataToPbx }