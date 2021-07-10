
import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
/* const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
} */

export default { signup }