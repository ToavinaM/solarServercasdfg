const { Users, Roles } = require("../models");

function buildRoles(rows) {
    let rep = [];
    let id = 0;
    let role;
    // console.log('asdasdada', row);
    for (let row of rows || []) {
        if (id != row.idRoles) {
            id = row.idRoles;
            role = new Roles();
            role.id = id;
            role.name = row.rolesName;
            role.users = [];
        }

        let user = new Users();
        user.id = row.idUsers;
        user.name = row.usersName;
        user.roles = new Roles();
        user.roles.id = row.idRoles;
        user.roles.name = row.rolesName;

        role.users.push(user);
        ///////////group by role
        if (!rep.includes(role))
            rep.push(role);
    }
    return rep;
}
module.exports = buildRoles;
