import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  // const vote = (id) => {
  //   dispatch({
  //     type: "VOTE",
  //     data: { id }
  //   })
  // }

  const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch({
      type: "ADD_ANECDOTE",
      data: {
        id: generateId(),
        content: content,
        votes: 0
      }
    })
  }

  const orderedAnecdotes = () => {
    return anecdotes.sort(function(a, b) {return b.votes - a.votes})
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App