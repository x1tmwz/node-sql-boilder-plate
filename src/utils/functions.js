function searchValueInObjIfNotExitsRetrunDefault(obj = {}, optionsStr = "", def = "") {
    if (!optionsStr) {
        return def;
    }
    const options = optionsStr.split(".")
    for (let i = 0; i < options.length; i++) {
        if (obj[options[i]]) {
            obj = obj[options[i]];
            continue;
        } else {
            return def;
        }
    }
    return obj;
}

function copyObject(obj, keysList = []) {
    if (keysList.length === 0) {
        return Object.assign({}, obj);
    }
    return keysList.reduce((start, current) => {
        start[current] = obj[current];
        return start;
    }, {})
}

function objectToUrlQueryParams(object = {}) {
    let keys = Object.keys(object);
    let query = keys.reduce((startVal, current, index) => {
        if (index === 0) {
            startVal += "?" + current + "=" + encodeURIComponent(object[current]);
        } else {
            startVal += "&" + current + "=" + encodeURIComponent(object[current]);
        }
        return startVal;
    }, "")
    return query;
}

function getDuplicateValuesInArr(arr) {
    const fillterObj = {}
    for (let i = 0; i < arr.length; i++) {
        fillterObj[arr[i]] = fillterObj[arr[i]] ? (fillterObj[arr[i]] + 1) : 1
    }
    return Object.keys(fillterObj).filter((value) => fillterObj[value] > 1)
}

module.exports= {
    searchValueInObjIfNotExitsRetrunDefault,
    copyObject,
    objectToUrlQueryParams,
    getDuplicateValuesInArr
}