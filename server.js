require("dotenv").config()
require('./config/database')

const express = require('express')
const morgan = require('morgan')

// Models
const Fruit = require("./models/fruit.js")

const app = express()

// MIDDLEWARE
app.use(morgan('dev'))

// ROUTES
// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs")
})

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})
  
// LISTENER
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
