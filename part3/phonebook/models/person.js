const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch(() => console.log('Database connection failed'))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 8
  }
})
personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema);

module.exports = Person;