import axios from 'axios'

const baseAddress = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseAddress).then((response) => {
    return response.data
  })
}

const create = (person) => {
  return axios.post(baseAddress, person).then((response) => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseAddress}/${id}`).then((response) => response.data)
}

const update = (id, updatedInformation) => {
  return axios
    .put(`${baseAddress}/${id}`, updatedInformation)
    .then((response) => response.data)
}

export default {
  getAll,
  create,
  remove,
  update,
}
