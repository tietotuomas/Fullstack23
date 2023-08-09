const AddNew = ({
  handleSubmit,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input value={newName} onChange={handleNameChange} />
        <br></br>
        <label>Number</label>
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default AddNew
