require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', (req) => {
  return Object.keys(req.body).length > 0
    ? JSON.stringify(req.body)
    : '(No req.body inlcluded)'
})

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', async (req, res, next) => {
  try {
    const date = new Date()
    const persons = await Person.find({})

    res.send(
      `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
    )
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  } catch (error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    return res.json(person)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons/', (req, res, next) => {
  if (req.body.name === undefined) {
    return res.status(400).json({ error: 'Name is required' })
  }

  if (req.body.number === undefined) {
    return res.status(400).json({ error: 'Number is required' })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  try {
    person.save().then((savedPerson) => {
      res.status(201).json(savedPerson)
    })
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const person = {
      name: req.body.name,
      number: req.body.number,
    }
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      person,
      { new: true }
    )
    res.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
