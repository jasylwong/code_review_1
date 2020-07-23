import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0, id: generateId() }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (votedAnecdote) => {
  const updatedAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
  const request = axios.put(`${baseUrl}/${votedAnecdote.id}`, updatedAnecdote)
  return request.then(response => response.data)
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export default { getAll, createNew, vote }