const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/:id", (req, res) => {
  const usersDB = readFile("users.json")
  const user = usersDB.filter((user) => user.ID === req.params.id)
  res.send(user)
})

router.get("/", (req, res) => {
  const usersDB = readFile("users.json")
  if (req.query && req.query.name) {
    const filteredUsers = usersDB.filter(
      (user) =>
        user.hasOwnProperty("name") &&
        user.name.toLowerCase() === req.query.name.toLowerCase()
    )
    res.send(filteredUsers)
  } else {
    res.send(usersDB)
  }
})

router.post("/", (req, res) => {
  const usersDB = readFile("users.json")
  const newUser = {
    ...req.body,
    ID: uniqid(),
    createdAt: new Date(),
  }

  usersDB.push(newUser)

  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(usersDB))

  res.status(201).send(usersDB)
})

router.delete("/:id", (req, res) => {
  const usersDB = readFile("users.json")
  const newDb = usersDB.filter((x) => x.ID !== req.params.id)
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

  res.send(newDb)
})

router.put("/:id", (req, res) => {
  const usersDB = readFile("users.json")
  const newDb = usersDB.filter((x) => x.ID !== req.params.id) //removing previous item
  const users = req.body
  users.ID = req.params.id
  newDb.push(users) //adding new item
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

  res.send(newDb)
})

module.exports = router