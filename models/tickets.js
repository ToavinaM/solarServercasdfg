class Tickets {
    id;
    code;
    title;
    description;
    mother; //mother is a parent ticket
    status;
    users; //users is Users instance
    files; //files is Array of documets
}
module.exports = Tickets;