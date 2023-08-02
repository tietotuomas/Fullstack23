import Part from './Part'
const Content = ({ parts }) => {
  console.log({ parts })
  return (
    <>
      {parts.map((p) => (
        <Part name={p.name} exercises={p.exercises} key={p.id} />
      ))}
    </>
  )
}

export default Content
