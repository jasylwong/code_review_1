const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch(() => console.log('Database connection failed'))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema);

// if (process.argv.length === 5) {
//   const person = new Person({
//     name: name,
//     number: number
//   })
//   person.save()
//     .then(res => {
//       console.log(`added ${res.name} to phonebook`)
//       mongoose.connection.close()
//     })
//     .catch(error => console.log(error))
// } else if (process.argv.length === 3) {
//   Person.find({})
//     .then(res => {
//       res.forEach(p => {
//         console.log(`${p.name} ${p.number}`)
//       })
//       mongoose.connection.close()
//     })
//     .catch(error => console.log(error))
// }

module.exports = Person;