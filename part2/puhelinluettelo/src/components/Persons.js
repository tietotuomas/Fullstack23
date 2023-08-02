const Persons = ({persons, filter}) => {
  const personsToShow = () => {
    return persons.filter((p) =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
  }
  return (
    <div>
      {personsToShow().map((p) => (
        <p key={p.name}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  )
}

export default Persons
