function validObject(obj, keysList = []) {
    if (keysList.length > 0) {
        for (let i = 0; i < keysList.length; i++) {
            if (!obj[keysList[i]] || obj[keysList[i]] === undefined || (Array.isArray(obj[keysList[i]]) && obj[keysList[i]].length === 0) || obj[keysList[i]] === null) {
                return false;
            }
        }
        return true;
    }
    const keys = Object.keys(obj)
    if (keys.length === 0) {
        return false
    }
    for (let i = 0; i < keys.length; i++) {
        if (!obj[keys[i]]) {
            return false;
        }
    }
    return true;
}
function validEmail(email) {
    const reg = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    return reg.test(email);
}
function isValidIsraeliPhoneNumber(number = '') {
    if (number.length !== 10) {
        return false
    }
    if (number[0] !== '0' || number[1] !== '5') {
        return false
    }
    return true
}


module.exports = {
    validObject,
    validEmail,
    isValidIsraeliPhoneNumber
}