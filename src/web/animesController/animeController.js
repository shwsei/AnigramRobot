const express = require("express");
const model = require("../schema/index");

const router = express.Router();

router.get("/animes",async (req,res)=>{
  try{
    const animes = await model.find();
    res.render("index",{animes: animes});
  }catch(err){
    console.log(err)
    res.redirect("/");
  }
})

module.exports = router;