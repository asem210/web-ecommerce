const router =require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");
const validInfo= require("../middleware/validCategory");

router.get("/view",authorize,async(req,res)=>{

  try {
    
    //Verify if exist any category on the table
    const idProd = await pool.query("SELECT count(id) FROM administrator")

    if(idProd.rows[0].count==="1"||idProd.rows.count==="0"){
      res.json(false);
    }else{
      res.json(true);
    }



    
  }  catch (err) {

    console.log(err);
    res.status(500).json("Server error");
    
  }

})

module.exports = router;