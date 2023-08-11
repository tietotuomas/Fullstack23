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
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', async (req, res) => {
  const date = new Date()
  const persons = await Person.find({})


  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
  )
})

app.get('/api/persons', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

app.get('/api/persons/:id', async (req, res) => {
  const person = await Person.findById(req.params.id)
  return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter((p) => p.id !== Number(req.params.id))
  console.log(req.params.id)
  return res.status(204).end()
})

app.post('/api/persons/', (req, res) => {

  if (req.body.name === undefined) {
    return res.status(400).json({error: 'Name is required'})
  }

  if (req.body.number === undefined) {
    return res.status(400).json({error: 'Number is required'})
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
