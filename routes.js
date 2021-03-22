const express = require("express")
const router = express.Router()
const { poolPromise, poolPromise_everis } = require("./db")

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
    const usn = req.body.usn_id_usuario
    const num = await getId(usn, res)

    console.log("print num", num)

    if (num != undefined) {
        getCompetitors(num)
    } else {
        res.end("Response not valid ")
    }
});

async function getId(usn, res) {
    try {
        const pool = await poolPromise
        const result = pool.request().query("select USN_EST_CODIGO ,USN_ID_USUARIO ,USN_MCL_CODIGO, est_numero_permiso from FP_UsuariosNegocios inner join FP_Estacion fe on usn_est_codigo= fe.EST_CODIGO where USN_ID_USUARIO = '" + usn + "'", function (err, recordset) {
            if (err) console.log(err)
            const est_numero_permiso = recordset.recordset[0].est_numero_permiso;
            console.log("el numero de permiso es ", est_numero_permiso)
            return est_numero_permiso;
        })
    } catch (err) {
        console.log(err)
    }
}

async function getCompetitors(x) {
    try {
        const pool2 = poolPromise_everis
        const result2 = pool2.request().query("select * from dbo.Competitors where est_numero_permiso ='" + x + "'", function (err, recordset) {
            if (err) console.log(err)
            console.log(recordset)
            return recordset
        })
    } catch {
        console.log(err)
    }
}

module.exports = router