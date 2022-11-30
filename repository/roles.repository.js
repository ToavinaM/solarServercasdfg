const { Users, Roles } = require("./../models");
const builder = require("../builder");

const { filter } = require('../utils');
class RolesRepository {
    ///get all role with userbyrole
    static async getAll(dbConnect, whereObject) {
        //order by is important for grouping roles instance to admin and user
        let sql = `select * from users_roles  where 1=1`;

        const { condition, value } = filter(whereObject);
        let res = await dbConnect(sql + condition + `order by "idRoles"`, value)
        return builder.roles(res.rows);
    }

    static async getById(dbConnect, id) {
        let res = await this.getAll(dbConnect, { idRoles: id })
        if (res.length != 1)
            throw new Error(`cannot find Roles with id =${id}`)
        return res[0]
    }





    // save(dbConnect) {
    //     let sql = "insert into users (name,idRoles)values($1,$2)"
    //     return this;
    // }

    // update(dbConnect) {
    //     let sql = "UPDATE users SET name = $1, idRoles= $2"
    //     return this;
    // }
}


module.exports = RolesRepository;