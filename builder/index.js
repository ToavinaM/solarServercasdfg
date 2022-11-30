const buildUser = require("./users.builder");
const buildRoles = require("./roles.builder");
const buildTickets = require("./tickets.builder");
const buildFiles = require("./files.builder");
module.exports = {
    users: buildUser,
    roles: buildRoles,
    tickets: buildTickets,
    files: buildFiles,
}