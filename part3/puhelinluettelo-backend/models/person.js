const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB')
    console.log(error)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: [true, 'Name is required'] },
  number: {
    type: String,
    minlength: 8,
    required: [true, 'Number is required'],
    validate: {
      validator: (v) => {
        console.log('validator')
        return /^(\d{2}-\d{5,}|\d{3}-\d{4,})$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = Person
