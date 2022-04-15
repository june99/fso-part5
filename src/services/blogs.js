import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
//let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`

}
// Hi everyone, happy friday! Currently working on ex 5.3 and have been stuck on this for a few hours.
//I have run into an issue where adding a new blog results in a 401 error
// I've checked the headers and can confirm that a logged in user should have a bearer token
// I've also verified that the token is valid through the debugger on the jwt site.
//Here's the code to add a new Blog and the post request.
//Could someone advise on what the issue may be? Thanks

const create = async (newObject) => {
  const config = {
    headers: {'Authorization': token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log(`RESPONSE: ${newObject}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const blogService = {
   getAll, setToken, create 
}

export default blogService
// export default { getAll, setToken, create }