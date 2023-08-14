const mongoose = require('mongoose')

if (process.argv.length === 3 || process.argv.length === 5) {
  const password = process.argv[2]
  const url = `mongodb+srv://bullo:${password}@cluster0.2h9isxk.mongodb.net/phonebook?retryWrites=true&w=majority`
  mongoose.set('strictQuery', false)

  mongoose.connect(url)

  mongoose.connection.on('connected', () => console.log('Connected'))

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  if (process.argv.length === 3) {
    console.log('fetching')
    Person.find({}).then((result) => {
      result.forEach((p) => {
        console.log(p)
      })
      mongoose.connection.close()
    })
  }

  if (process.argv.length === 5) {
    console.log('create a new')
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    })
    person.save().then((createdPerson) => {
      console.log(createdPerson)
      mongoose.connection.close()
    })
  }
} else {
  console.log('Please enter correct amount of parameters:')
  console.log('To show all the contacts: node mongo.js yourpassword')
  console.log(
    'To add a new contact: node mongo.js yourpassword "Arto Vihavainen" 040-1234556'
  )
  process.exit(1)
}
