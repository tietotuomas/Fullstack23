import { useState, useEffect } from 'react'
import personService from './services/PersonService'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('useEffect')
    personService
      .getAll()
      .then((initialPersons) => {
        console.log(initialPersons)
        setPersons(initialPersons)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const duplicate = persons.find((p) => p.name === newName)
    if (duplicate) {
      alert(`${duplicate.name} is already added to phonebook`)
    } else {
      personService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((createdPerson) => {
          console.log({ createdPerson })
          setPersons(persons.concat(createdPerson))
        })
        .catch((error) => {
          console.log(error)
        })

      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <AddNew
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
