const express = require("express")
const usersRouter = require("./services/users")
const moviesRouter = require("./services/movies")
const { unauthorizedHandler } = require("./services/users/errorHandling")
//const{}

const app = express()

const port = process.env.PORT || 3001

app.use(express.json()) // Built in middleware

// ROUTES
app.use("/users", usersRouter)
// app.use("/movies", moviesRouter)

//ERROR HANDLERS
/*app.use(notFoundHandler)
app.use(unauthorizedHandler)
app.use(forbiddenHandler)
app.use(catchHandler)
*/
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})