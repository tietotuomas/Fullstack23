const Persons = ({ persons, filter, handleDeleteClick }) => {
  console.log({persons});
  const personsToShow = () => {
    return persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  return (
    <div>
      {personsToShow().map((p) => (
        <p key={p.id}>
          {p.name} {p.number}{' '}
          <button onClick={() => handleDeleteClick(p.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons
