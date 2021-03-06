import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Filter from './Filter'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = filter ?
    anecdotes.filter(a => a.content.toLowerCase().includes(filter)) : anecdotes

  const orderedAnecdotes = () => {
    return filteredAnecdotes.sort(function(a, b) {return b.votes - a.votes})
  }

  const handleVote = async (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(anecdote.content, 5))
  }

  return (
    <div>
      <h2>Anecdote list</h2>
      <Notification />
      <Filter />
      {orderedAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
