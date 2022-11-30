const { Files, Tickets, Users, Roles } = require("../models");
const builder = require("../builder");
const { filter } = require('../utils');
class FilesRepository {

    static async getAll(dbConnect, whereObject) {
        let sql = `select * from files where 1=1 `;
        const { condition, value } = filter(whereObject);
        let res = await dbConnect(sql + condition, value);
        return builder.files(res.rows);
        // return res;
    }

    static async getByTicket(dbConnect, id) {
        let res = await this.getAll(dbConnect, { idTickets: id })

        if (res.length != 1)
            throw new Error(`cannot find Ticket with idTickets =${id}`)
        return res[0]
    }

    static async update(dbConnect, files) {
        let sql = `UPDATE files set "deleted"=$1 where "idFiles"=$2`
        return await dbConnect(sql, [files.deleted, files.id])
    }
    static async getById(dbConnect, id) {
        let res = this.getAll(dbConnect, { idFiles: id })
        if (res.length != 0)
            throw new Error(`cannot find File with id=${id}`);
        return res[0];
    }
    static deleteOrRestore(dbConnect, files) {
        // let files=await this.getByTicket(dbConnect,idTickets)
        // for(let f of files||[]){
        f.deleted = !f.deleted;
        return this.update(dbConnect, f)
        // }
    }
    static async save(dbConnect, files) {

        let sql = `INSERT INTO files ("name","mimetype","extension","idTickets","filesPath") values ($1,$2,$3,$4,$5)`;
        return await dbConnect(sql, [files.name, files.mimetype, files.extension, files.tickets.id, files.filesPath])
    }
}


module.exports = FilesRepository;