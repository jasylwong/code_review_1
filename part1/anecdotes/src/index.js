import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Anecdote from './components/Anecdote';

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [mostVotes, setMostVotes] = useState(0)
  
  const handleClick = () => {
    let newSelected = Math.floor(Math.random() * anecdotes.length)
    while (newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(newSelected)
  }

  const handleVotes = () => {
    const selectedVoteCount = votes[selected] || 0
    console.log(selectedVoteCount)
    console.log(selected)
    setVotes({ ...votes, [selected]: selectedVoteCount + 1})
    if (!votes[mostVotes] || selectedVoteCount + 1 > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <Header content="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <Header content="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVotes]} votes={votes[mostVotes]} />
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
