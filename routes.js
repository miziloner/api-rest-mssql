const express = require("express")
const router = express.Router()
const { poolPromise } = require("./db")

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
            //.input
            .query("select * from dbo.FP_Estacion")
        //console.log(recordset)
        res.json(result.recordset[0])

    } catch (err) {
        res.status(500)
        res.send(err.message)

    }
    /*res.send("Hola mundo")
    console.log("Hola mundo")*/

});

module.exports = router