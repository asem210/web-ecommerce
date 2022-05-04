const router =require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

router.get("/",authorize,async(req,res) => {
  
  try {
    
    const user = await pool.query("SELECT name FROM administrator WHERE id = $1",[req.user])
    
    res.json(user.rows[0]);
  
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }

})



module.exports=router;  

