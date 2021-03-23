const express = require("express");
const { pool } = require("mssql");
const router = express.Router()
const { poolPromise, poolPromise_everis, sql } = require("./db")

/*router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request().query("select * from dbo.FP_Estacion")
        res.json(result.recordset[0])

    } catch (err) {
        res.status(500)
        res.send(err.message)

    }
    /*res.send("Hola mundo")
    console.log("Hola mundo")*/
//});*/


router.post('/api/getid', async (req, res) => {
    const usn = req.body.usn_id_usuario;
    // let numero = await getId(usn)
    const getid = async () => {
        queryNumPermiso(usn).then(result => {
            console.log("id cre: ", result);
            getCompetitors(result).then(lista => {
                console.log("lista", lista);
                res.json(lista);
            })
        });

    };

    getid();



});


var queryNumPermiso = async function (usn) {
    const pool = await poolPromise
    const fin = pool.request().query("select USN_EST_CODIGO ,USN_ID_USUARIO ,USN_MCL_CODIGO, est_numero_permiso from FP_UsuariosNegocios inner join FP_Estacion fe on usn_est_codigo= fe.EST_CODIGO where USN_ID_USUARIO = '" + usn + "'")
        .then(result => {
            let est_numero_permiso = result.recordset[0].est_numero_permiso;
            return est_numero_permiso;
        })
    return fin;
};

var getCompetitors = async function (x) {
    const pool2 = await poolPromise_everis;
    const end2 = pool2.request().query("select * from dbo.Competitors where est_numero_permiso ='" + x + "'")
        .then(result => {
            console.log(result);
            return result;
        })
    return end2;
}

module.exports = router