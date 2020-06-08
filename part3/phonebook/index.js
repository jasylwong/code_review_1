const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },  
  {
    "name": "Duke Devlin",
    "number": "12345",
    "id": 5
  },
  {
    "name": "Yugi Moto",
    "number": "44444",
    "id": 6
  }
]

app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get(`/api/persons/:id`, (req, res) => {
  const person = persons.find(p => p.id === parseInt(req.params["id"]))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get(`/api/persons/:id`, (req, res) => {
  const person = persons.find(p => p.id === parseInt(req.params.id))
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  person.id = 333
  persons.push(person)
  res.json(req.body)
})

app.delete('/api/persons/:id', (req, res) => {
  const deletedPerson = persons.find(p => p.id === parseInt(req.params.id))
  persons = persons.filter(p => p.id !== deletedPerson.id)
  res.status(204).end()
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})