function createQueryForInsert(obj) {
    const keys = Object.keys(obj)
    return keys.reduce((start, current, index) => {
        const isEnd = (index === keys.length - 1);
        start.query += current + (isEnd ? "" : ",");
        start.emptyQuery += "?" + (isEnd ? "" : ",");
        start.values.push(obj[current]);
        return start;

    }, { query: "", values: [], emptyQuery: "" })
}
function createQueryForSelect(obj) {
    const keys = Object.keys(obj)
    return keys.reduce((start, current, index) => {
        const isEnd = (index === keys.length - 1);
        start.query += current + (isEnd ? "=?" : "=?,");
        start.values.push(obj[current]);
        return start;
    }, { query: "", values: [] })
}
function createQueryForWhere(obj,prefix="") {
    const keys = Object.keys(obj)
    return keys.reduce((start, current, index) => {
        const isEnd = (index === keys.length - 1);
        const fieldName = prefix? prefix+"."+current:current;
        if(Array.isArray(obj[current])){
            start.query += fieldName + (isEnd ? " in (?)" : " in (?) AND ");
            start.values.push(obj[current]);
        }else{
            start.query += fieldName + (isEnd ? "=?" : "=? AND ");
            start.values.push(obj[current]);
        }
        return start;
    }, { query: "", values: [] })
}

module.exports = {
    createQueryForInsert,
    createQueryForSelect,
    createQueryForWhere
}