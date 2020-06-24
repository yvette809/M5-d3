const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")


const router = express.Router;

const readFile = (fileName) =>{
    const buffer= fs.readFileSync(path.join(__dirname,fileName))
    return JSON.parse(buffer.toString())
}
router.get("/", (req,res) =>{
    const userDB = readFile("user.json")
    if(req.query && req.query.name){
        const filteredUsers = userDB.filter(user => user.name=== req.query.name)
        res.send(filteredUsers)
    }else{
        res.send(userDB)
    }
    

})



module.exports = router