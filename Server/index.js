const express = require("express");
const app = express();
const cors=require("cors");

//middleware
app.use(express.json());//req.body
app.use(cors());

//ROUTES//

//ADMIN LOGIN AND REGISTER ROUTE

app.use("/auth",require("./routes/user"));

//NAVBAR ROUTE

app.use("/nav", require("./routes/navBar"));

//CATEGORYS ROUTE

app.use("/category",require("./routes/category"));

//PRODUCTS ROUTE

app.use("/product", require("./routes/product"))

app.listen(5000,()=>{
  console.log("server is running on port 5000")
})
