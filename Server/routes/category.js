const router =require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");
const validInfo= require("../middleware/validCategory");

router.get("/view",authorize,async(req,res)=>{

  try {

    //Verify if exist any category on the table
    const idCat = await pool.query("SELECT count(id) FROM category")

    if(idCat.rows[0].count==="0"){
      res.json(false)
    }else{
      res.json(true)
    }

    
  } catch (err) {

    console.log(err);
    res.status(500).json("Server error");
    
  }


})

router.post("/createCategory",validInfo,async(req,res)=>{

  try {

    //1. destructure the req.body(Parametros a insertar)

    const {name,description}=req.body;

    //2. Verify if the category already exist

    const category= await pool.query("SELECT * FROM category WHERE name = $1",[
      name]);


    if(category.rows.length !==0){
      return res.status(401).json("Category already exist");
    }

    //4. Insert category into the database

    const newCategory = await pool.query("INSERT INTO category (name,description) VALUES($1,$2) RETURNING *",
      [name,description]);

    res.json(newCategory.rows);



    
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }


})
/*
router.post("/createCategory",validInfo,async(req,res)=>{

  try {
    
    //1. destructure the req.body(Parametros a insertar)
    const {name,description}=req.body;

    //2. Verify if the category already exist

    const category= await pool.query("SELECT name FROM category WHERE name = $1",[
      name]);


    if(category.rows.length !==0){
      return res.status(401).json("Can not edit if use the same value");
    }



    
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }

})
*/
module.exports=router;  