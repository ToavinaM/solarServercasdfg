const { Users, Roles } = require("./../models");
const builder = require("../builder");
const { filter } = require("../utils");

class UsersRepository {

    static async getAll(dbConnect, whereObject) {
        let sql = `select * from users_roles where 1=1 `;
        const { condition, value } = filter(whereObject);
        let res = await dbConnect(sql + condition, value)
        return builder.users(res.rows);

    }


    //get instance of user and role
    static async getById(dbConnect, id) {
        let res = await this.getAll(dbConnect, { idUsers: id })
        if (res.length != 1)
            throw new Error(`cannot find Users with id =${id}`)
        return res[0]
    }

    static async save(dbConnect, users) {
        let sql = `insert into users ("name","idRoles")values($1,$2)`
        await dbConnect(sql, [users.name, users.roles.id])
        return users;
    }

    static async update(dbConnect, users) {
        let sql = `UPDATE users SET "name" = $1, "idRoles"= $2`
        await dbConnect(sql, [users.name, users.roles.id])
        return users;
    }
    static delete(dbConnect, users) {
        let sql = `DELETE from users where id=$1`;
        return dbConnect(sql, [users.id])
    }
}


module.exports = UsersRepository;