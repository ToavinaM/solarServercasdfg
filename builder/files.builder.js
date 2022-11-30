function buildFiles(row) {
    let rep = []
    for (let r of row || []) {
        if (r.idFiles) {
            let files = new Files();
            files.id = r.idFiles;
            files.filesPath = r.filesPath;
            files.name = row.name;
            files.extension = row.extension;
            files.mimetype = row.mimetype;



            files.tickets = new Tickets();
            files.tickets.id = r.idTickets;

            if (r.idmother) {
                files.tickets.mother = new Tickets();
                files.tickets.id = r.idMother;
            }
            files.tickets.code = r.code;
            files.tickets.status = r.status;
            files.tickets.createdAt = r.createdAt;

            files.tickets.user = new Users()
            files.tickets.user.id = r.idUsers;
            files.tickets.user.name = r.usersName
            files.tickets.user.roles = new Roles();
            files.tickets.user.roles.id = r.idRoles;
            files.tickets.user.roles.name = r.rolesName;

            rep.push(files)
        }


    }
    return rep;
}
module.exports = buildFiles;