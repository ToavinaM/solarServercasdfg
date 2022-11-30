const builder = require("../builder");

const { filter } = require('../utils');
class TicketRepository {
    //cascade update
    static delete(dbConnect, code) {
        let sql = `delete  from tickets where "code" = $1`;
        return dbConnect(sql, [code]);
    }
    static async update(dbConnect, code, tickets) {
        let sql = `UPDATE tickets SET "description" = $1, "status"= $2 ,"title"=$3 where code=$4`
        await dbConnect(sql, [tickets.description, tickets.status, tickets.title, code]);
        let res = await TicketRepository.getAll(dbConnect, { code: code });
        return res;
    }

    //if I want to get reply of ticket, I put all ticket with mother  
    static async getAll(dbConnect, whereObject) {
        let sql = `select * from tickets_users_roles_files where 1=1 `;
        const { condition, value } = filter(whereObject);
        console.log(sql + condition);
        let res = await dbConnect(sql + condition + 'order by "idTickets","idFiles"', value)
        return builder.tickets(res.rows);
    }
    /// if idMother --> reply
    static async save(dbConnect, newTicket) {
        console.log('debuddddddd', newTicket);
        let sql = `insert into tickets ("idMother","code","idUsers","title", "description")values($1,$2,$3,$4,$5)`;
        let row = await dbConnect(sql, [newTicket.mother?.id, newTicket.code, newTicket.users.id, newTicket.title, newTicket.description])
        // .then()
        console.log('here', row.result);
        return newTicket;
    }

    static async getByCode(dbConnect, code) {
        let res = await TicketRepository.getAll(dbConnect, { code: code });
        // console.log('asdasd', res);
        if (res.length != 1)
            throw new Error(`cannot find Ticket with code =${code}`)
        return res[0]
    }
    static async getById(dbConnect, id) {
        let res = await TicketRepository.getAll(dbConnect, { idTickets: id });
        if (res.length != 1)
            throw new Error(`cannot find Ticket with id =${id}`)
        return res[0]
    }

}


module.exports = TicketRepository;