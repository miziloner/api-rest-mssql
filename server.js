const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
var sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/api', router);
// config for your database
/*var config = {
    user: 'usreveris',
    password: 'UEverS#21',
    server: 'h2918c01.hyperfive.com',
    database: 'MX_FuelPrice_Everis',
    port: 8433
};*/


var config = {
    user: 'dna-admin',
    password: '3^WCD9Zxj^bN',
    server: 'dna-sql-everis.database.windows.net',
    database: 'dna_fuelmc_lab',
    port: 1433
};

app.post('/post-test', (req, res) => {
    id_cre = console.log('el body:', req.body);
    //id_cre = res.send(req.params.id_cre)
    //id_cre = "PL/4771/EXP/ES/2015"
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query("select * from Competitors WHERE EST_NUMERO_PERMISO ='" + req.body.id_cre + "'", function (err, recordset) {

            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
            console.log(recordset);
        });
    });


});



app.post('/api/cre/:cre', (req, res) => {
    // connect to your database
    console.log(req.body, res.body)
    var cre = req.param('cre');
    res.send(req.param.cre)

    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("select * from dbo.BI_Precios WHERE PRE_EST_PERMISO_CRE ='?'", function (cre, err, recordset) {

            if (err) console.log(err)
            // send records as a response
            res.send(recordset);

        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

