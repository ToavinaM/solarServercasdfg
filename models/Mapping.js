const DbConnect = require('./DbConnect');
const mapping = {
    execute: (myQuery) => {
        return new Promise((resolve, reject) => {
            DbConnect.connect();
            DbConnect.query(myQuery, (err, res) => {
                if (err) reject(err);
                DbConnect.end();
                resolve(res);
            });
        })
    }
}

module.exports = mapping
