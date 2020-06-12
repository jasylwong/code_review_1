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

app.get(`/api/persons/:id`, (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res) => {
  const body = req.body
  Person.find({}).then(persons => {
    personsNames = persons.map(p => p.name)
    if (personsNames.includes(body.name)) {
      return res.status(400).json({ error: 'name not unique' })
    }
  })

  if (body.name.length < 3) {
    return res.status(400).json({ error: 'name must be at least 3 characters' })
  }

  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => console.log(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('got to finding stage')
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.deleteOne({ _id: req.params.id.toString() })
    .then(person => {
      console.log('deleted')
    })
    .catch(error => next(error))
  res.status(204).end()
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})