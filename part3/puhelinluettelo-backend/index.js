const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
]

app.use(express.json())

morgan.token('body', (req) => {
  return Object.keys(req.body).length > 0
    ? JSON.stringify(req.body)
    : '(No req.body inlcluded)'
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (req, res) => {
  const date = new Date()

  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((p) => p.id === Number(req.params.id))
  if (person) {
    return res.json(person)
  }
  res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter((p) => p.id !== Number(req.params.id))
  console.log(req.params.id)
  return res.status(204).end()
})

app.post('/api/persons/', (req, res) => {
  const person = req.body
  if (!person.name) {
    return res.status(400).json({ error: 'Name missing' })
  }
  if (!person.number) {
    return res.status(400).json({ error: 'Number required' })
  }
  const duplicate = persons.find((p) => p.name === person.name)
  if (duplicate) {
    return res.status(400).json({ error: 'Name must be unique' })
  }
  person.id = Math.floor(Math.random() * 1000) + 5
  persons = persons.concat(person)
  res.status(201).json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
