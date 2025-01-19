require("dotenv").config()
require('./config/database')

const express = require('express')
const morgan = require('morgan')
const methodOverride = require("method-override")
const path = require("path")

// Models
const Fruit = require("./models/fruit.js")

const app = express()

// MIDDLEWARE
app.use(methodOverride("_method"))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

// ROUTES
// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

app.get('/fruits', async (req, res) => {
  const allFruits = await Fruit.find()
  res.render('fruits/index.ejs', { fruits: allFruits })
})
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})

// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits")
})

app.get("/fruits/:fruitId", async (req, res) => {
  const fruitId = req.params.fruitId
  const fruit = await Fruit.findById(fruitId)
  res.render('fruits/show.ejs', { fruit: fruit })
})

app.delete("/fruits/:fruitId", async (req, res) => {
  const fruitId = req.params.fruitId
  await Fruit.findByIdAndDelete(fruitId)
  res.redirect("/fruits")
})

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const fruitId = req.params.fruitId
  const fruit = await Fruit.findById(fruitId)
  res.render("fruits/edit.ejs", { fruit: fruit })
})

app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }

  const fruitId = req.params.fruitId
  await Fruit.findByIdAndUpdate(fruitId, req.body)
  res.redirect(`/fruits/${fruitId}`)
})

// LISTENER
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
