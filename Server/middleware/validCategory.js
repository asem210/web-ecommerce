module.exports = function(req, res, next) {
  const {name,description} = req.body;
  function validText(text){
    return /^[A-Za-z]+$/.test(text)
  }

  if(req.path === "/createCategory"){
    if(![name,description].every(Boolean)){
      return res.status(401).json("Missing Values");
    }else if(!validText(name)){
      return res.status(401).json("Invalid category");
    }
  }

  next();

}