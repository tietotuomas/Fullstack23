import { useState } from 'react'
import Header from './components/Header'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClick = (feedback, setFeedback) => {
    setFeedback(feedback + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => handleClick(good, setGood)} text={'good'} />
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        text={'neutral'}
      />
      <Button handleClick={() => handleClick(bad, setBad)} text={'bad'} />
      <Header text="statistics" />
      <Statistics
        goodVotes={good}
        neutralVotes={neutral}
        badVotes={bad}
        all={all}
      />
    </div>
  )
}

export default App
