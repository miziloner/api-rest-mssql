const sql = require("mssql");


const poolPromise = new sql.ConnectionPool(getDBconfig()).connect().then(pool => {
    console.log('Connected to MSSQL')
    return pool
})
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))


function getDBconfig() {
    return {
        user: 'usreveris',
        password: 'UEverS#21',
        server: 'h2918c01.hyperfive.com',
        database: 'MX_FuelPrice_Everis',
        port: 8433
    }
}
module.exports = {
    sql, poolPromise
}