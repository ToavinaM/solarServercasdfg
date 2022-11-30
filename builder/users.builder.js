const { Users, Roles } = require("../models");

function buildUser(row) {
    let rep = [];
    // console.log('asdasdada', Users);
    for (let r of row || []) {
        // console.log(r);
        let u = new Users();
        u.id = r.idUsers;
        u.name = r.usersName;
        u.roles = new Roles();
        u.roles.id = r.idRoles;
        u.roles.name = r.rolesName
        rep.push(u)
    }
    return rep;
}
module.exports = buildUser;