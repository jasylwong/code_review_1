import React from 'react';

const Anecdote = ({ text, votes=0 }) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {votes} votes.</div>
    </div>
  )
}

export default Anecdote;