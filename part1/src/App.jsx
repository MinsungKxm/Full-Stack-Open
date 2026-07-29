import { useState } from "react";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(
    Array(anecdotes.length).fill(0)
  );

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copy = [...votes];

    copy[selected] += 1;

    setVotes(copy);
  };

  const mostVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(mostVotes);

  return (
    <div>
      <h1>Give feedback</h1>

      <Button
        text="good"
        onClick={() => setGood(good + 1)}
      />

      <Button
        text="neutral"
        onClick={() => setNeutral(neutral + 1)}
      />

      <Button
        text="bad"
        onClick={() => setBad(bad + 1)}
      />

      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />

      <h1>Anecdote</h1>

      <p>{anecdotes[selected]}</p>

      <p>has {votes[selected]} votes</p>

      <Button
        text="vote"
        onClick={handleVote}
      />

      <Button
        text="Next anecdote"
        onClick={handleNextAnecdote}
      />
    </div>
  );
};

export default App;