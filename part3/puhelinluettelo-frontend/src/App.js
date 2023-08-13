import { useState, useEffect } from 'react'
import personService from './services/PersonService'
import Filter from './components/Filter'
import AddNew from './components/AddNew'
import Persons from './components/Persons'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({ message: '', error: false })
  const [timeoutId, setTimeoutId] = useState(null)

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

  const setNewMessage = (msg, isError) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setMessage({ message: msg, error: isError })
    const newTimeoutId = setTimeout(() => {
      setMessage({ message: '', error: false })
    }, 5000)
    setTimeoutId(newTimeoutId)
  }

  const handleDeleteClick = (id) => {
    const personToBeRemoved = persons.find((p) => p.id === id)
    const confirmed = window.confirm(`Delete ${personToBeRemoved.name}?`)
    if (confirmed) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          setNewMessage(`${personToBeRemoved.name} removed successfully`, false)
        })
        .catch((error) => {
          console.log(error)
          if (error.message === 'Request failed with status code 404') {
            setNewMessage(
              `Information of ${personToBeRemoved.name} has already been removed from the server`,
              true
            )
            setPersons(persons.filter((p) => p.id !== personToBeRemoved.id))
          }
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
            console.log({ updatedPerson })
            if (!updatedPerson) {
              throw new Error(
                `Information of ${duplicate.name} has already been removed from the server`
              )
            }
            setNewMessage(
              `Information of ${duplicate.name} updated successfully`,
              false
            )

            setPersons(
              persons.map((p) => (p.id !== duplicate.id ? p : updatedPerson))
            )
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.log(error)
            if (
              error.message === 'Request failed with status code 404' ||
              error.message ===
                `Information of ${duplicate.name} has already been removed from the server`
            ) {
              setNewMessage(
                `Information of ${duplicate.name} has already been removed from the server`,
                true
              )
              setPersons(persons.filter((p) => p.id !== duplicate.id))
            } else if (error.response.data.error) {
              setNewMessage(error.response.data.error, true)
            }
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

          setNewMessage(`${newName} added successfully`, false)
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          console.log(error)
          if (error.response.data.error) {
            setNewMessage(error.response.data.error, true)
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
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
