import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
  let mostVotes = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b)
  
  const handleClick = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }

  const handleVotes = () => {
    const points = { ...votes }
    points[selected] += 1
    setVotes(points)
  }

  return (
    <div>
      <Header content="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes.</div>
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <Header content="Anecdote with most votes" />
      <div>{anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes.</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
