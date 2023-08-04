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

  const handleDeleteClick = (id) => {
    const personToBeRemoved = persons.find((p) => p.id === id)
    const confirmed = window.confirm(`Delete ${personToBeRemoved.name}?`)
    if (confirmed) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const duplicate = persons.find((p) => p.name === newName)
    if (duplicate) {
      const confirmed = window.confirm(
        `${duplicate.name} is already added to phonebook, replace the old number (${duplicate.number}) with a new one?`
      )
      if (confirmed) {
        personService
          .update(duplicate.id, { name: newName, number: newNumber })
          .then((updatedPerson) => {
            console.log(updatedPerson)
            setPersons(
              persons.map((p) => (p.id !== duplicate.id ? p : updatedPerson))
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log(error)
          })
      }
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
      <Persons
        persons={persons}
        filter={filter}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App
