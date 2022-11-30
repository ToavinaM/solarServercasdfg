function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function filter(where) {
    let keys = Object.keys(where);
    let value = [];
    let condition = "";
    for (let k = 0; k < keys.length; k++) {
        condition += ` and "${keys[k]}"`;
        if (where[keys[k]] == null) {
            condition += " is null "
        }
        else
            condition += "= $" + (k + 1)

    }
    for (let k of keys)
        if (where[k] != null)
            value.push(where[k])
    return { condition, value }
}
function where(whereString) {
    if (!whereString)
        return {}
    //convert wherestring to object
    return JSON.parse(whereString)
}

module.exports = { filter, makeId, where }