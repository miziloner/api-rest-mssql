const sql = require("mssql");



exports.sayHello = function () {
    console.log("Hola")
};

exports.connect = function (config, res) {
    console.log("connecting...")
    new sql.ConnectionPool(config).connect().then(pool => {
        res(pool)
        //return pool.query`select * from mytable where id = ${value}`
    }).catch(err => {
        console.log("Waka Error is " + err)
        // ... error checks
    })

};
/*
new sql.ConnectionPool(config).connect().then(pool => {
    return pool.query`select * from mytable where id = ${value}`
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})/*/

