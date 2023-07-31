import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { content: 'If it hurts, do it more often.', votes: 0 },
    {
      content: 'Adding manpower to a late software project makes it later!',
      votes: 0,
    },
    {
      content:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0,
    },
    {
      content:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0,
    },
    { content: 'Premature optimization is the root of all evil.', votes: 0 },
    {
      content:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0,
    },
    {
      content:
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      votes: 0,
    },
    { content: 'The only way to go fast, is to go well.', votes: 0 },
  ])

  const [selected, setSelected] = useState(0)

  const selectRandom = () => {
    let randomIndex = selected
    while (randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomIndex)
  }

  const vote = () => {
    const updatedAnecdotes = [...anecdotes]
    updatedAnecdotes[selected].votes += 1
    setAnecdotes(updatedAnecdotes)
  }

  const maxVotes = () =>
    anecdotes.reduce((previousAnecdote, anecdote) => {
      console.log({ previousAnecdote })
      console.log({ anecdote })
      if (anecdote.votes > previousAnecdote.votes) {
        return anecdote
      }
      return previousAnecdote
    }, anecdotes[0])

  

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <div>{anecdotes[selected].content}</div>
      <div>has {anecdotes[selected].votes} votes</div>

      <button onClick={vote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h3>Anecdote with most votes</h3>
      {maxVotes().content}
    </div>
  )
}

export default App
