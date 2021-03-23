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
    const usn = req.body.usn_id_usuario
    // let numero = await getId(usn)
    const getid = () => {
        getId(usn).then(result => {
            console.log("..", result);
        });

    };
    getid();




    /*getId(usn).then(b => {
        console.log("..", b)
    })*/

    /*  console.log("print num", num)
  
      if (num != undefined) {
          getCompetitors(num).then(x => {
              console.log(x)
          })
      } else {
          res.end("Response not valid ")
      }*/
});

/*async function getId(usn, res) {
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
}*/


var getId = async function (usn) {
    const pool = await poolPromise
    pool.request().query("select USN_EST_CODIGO ,USN_ID_USUARIO ,USN_MCL_CODIGO, est_numero_permiso from FP_UsuariosNegocios inner join FP_Estacion fe on usn_est_codigo= fe.EST_CODIGO where USN_ID_USUARIO = '" + usn + "'").then(result => {
        let est_numero_permiso = result.recordset[0].est_numero_permiso;
        return est_numero_permiso;
    })

}



async function getCompetitors(x, err) {
    try {
        const pool2 = poolPromise_everis
        pool2.request().query("select * from dbo.Competitors where est_numero_permiso ='" + x + "'",
            function (err, recordset) {
                if (err) console.log(err)
                console.log(recordset)
                return recordset
            })
    } catch {
        console.log(err)
    }
}

module.exports = router