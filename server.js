// Here is where we import modules
// We begin by loading Express
const express = require('express')
const morgan = require('morgan')

const dotenv = require("dotenv") // require package
dotenv.config() // Loads the environment variables from .env file

const app = express()

// MIDDLEWARE
app.use(morgan('dev'))

// ROUTES
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs")
})
  


// LISTENER
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
