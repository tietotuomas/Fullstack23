const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => {
    console.log(p)
    return sum + p.exercises
  }, 0)

  return (
    <p>
      <b>Total number of exercises {total}</b>
    </p>
  )
}

export default Total
