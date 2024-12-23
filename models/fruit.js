const mongoose = require('mongoose')

// Create the Schema
const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
})

// Register the model 
const Fruit = mongoose.model('Fruit', fruitSchema) // create model

// Share it with the rest of the app
module.exports = Fruit