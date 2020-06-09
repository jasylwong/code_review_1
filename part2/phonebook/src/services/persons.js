import axios from 'axios';
const url = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(url)
}

const create = (person) => {
  return axios.post(url, person)
}

const remove = (person) => {
  return axios.delete(`${url}/${person.id}`)
}

const update = (person) => {
  return axios.put(`${url}/${person.id}`, person)
}

export default { getAll, create, remove, update }