const sql = require("mssql");


const poolPromise = new sql.ConnectionPool(getDBconfig()).connect().then(pool => {
    console.log('Connected to Fuel')
    return pool
})
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

const poolPromise_everis = new sql.ConnectionPool(getDBconfigEveris()).connect().then(pool => {
    console.log('Connected to Everis')
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


function getDBconfigEveris() {
    return {
        user: 'dna-admin',
        password: '3^WCD9Zxj^bN',
        server: 'dna-sql-everis.database.windows.net',
        database: 'dna_fuelmc_lab',
        port: 1433
    }
}


module.exports = {
    sql, poolPromise, poolPromise_everis
}