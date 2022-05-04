const router = require("express").Router();
const pool= require("../db");
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/authorize");

//Login

router.post("/login",validInfo,async (req,res)=>{

  try {
    //1. Destructure the req.body (Datos ingresados por validar)

    const {email,password} = req.body;

    //2. Verify if user doesnt exist (if not throw error)
 
    const user= await pool.query("SELECT * FROM administrator WHERE email = $1",
       [email]);
    
    if(user.rows.length === 0){
      return res.status(401).send("Incorrect email or password");
    }
    
    //3. Verify if admin role coincide

    const role = await pool.query("select profile.code from profile inner join administrator on profile.id=administrator.id_profile where administrator.email=$1",
      [email])

    
    if(role.rows[0].code!=="ADM"){
      return res.status(401).send("Incorrect email");
    }

    //4. Check if passwords coincide

    const validPassword = await bcrypt.compare(password, user.rows[0].psswrd);

    if(!validPassword){
      return res.status(401).json("Password not valid")
    }

    console.log(validPassword);
    //5. Give JWT
    const token= jwtGenerator(user.rows[0].id);

    res.json({token});


  } catch (err) {
      console.error(err)
  }

})

router.get("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;