const mongoose = require('mongoose');
const url = `mongodb+srv://jasylwong:${process.argv[2]}@cluster0-7yxwh.mongodb.net/phonebook?retryWrites=true&w=majority`

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('give both name and number as arguments')
  process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch(() => console.log('Database connection failed'))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number
  })
  person.save()
    .then(res => {
      console.log(`added ${res.name} to phonebook`)
      mongoose.connection.close()
    })
    .catch(error => console.log(error))
} else if (process.argv.length === 3) {
  Person.find({})
    .then(res => {
      res.forEach(p => {
        console.log(`${p.name} ${p.number}`)
      })
      mongoose.connection.close()
    })
    .catch(error => console.log(error))
}