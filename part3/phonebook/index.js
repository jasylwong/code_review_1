const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json());
app.use(cors())
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));
morgan.token('post-body', function(req, res) {
  return JSON.stringify(req.body)
});

app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
  .catch(error => console.log(error))
})

app.get(`/api/persons/:id`, (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(error => console.log(error))
})

// app.post('/api/persons', (req, res) => {
//   const person = req.body
//   const nameExists = !!persons.find(p => p.name === person.name)
//   if (!person.name || !person.number || !person) {
//     res.status(400).send({ error: 'content missing' })
//   } else if (nameExists) {
//     res.status(400).send({ error: 'name must be unique' })
//   } else {
//     person.id = 334
//     persons.push(person)
//     res.json(req.body)
//   }
// })

// app.delete('/api/persons/:id', (req, res) => {
//   const deletedPerson = persons.find(p => p.id === parseInt(req.params.id))
//   persons = persons.filter(p => p.id !== deletedPerson.id)
//   res.status(204).end()
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})