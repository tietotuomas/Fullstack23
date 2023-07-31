import StatisticLine from './StatisticLine'

const Statistics = ({ goodVotes, neutralVotes, badVotes, all }) => {

    const average = () => {
        return (goodVotes-badVotes)/all
    }
    const positive = () => {
        return goodVotes/all*100
    }
  if (all === 0) {
    return <div>No feedback given</div>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={goodVotes} />
        <StatisticLine text="neutral" value={neutralVotes} />
        <StatisticLine text="bad" value={badVotes} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average().toFixed(1)}/>
        <StatisticLine text="positive" value={`${positive().toFixed(1)} %`}/>
      </tbody>
    </table>
  )
}

export default Statistics
