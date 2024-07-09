import { users } from '../data/agentes.js'

const getOne = (email) => {
  const user = users.find(user => user.email === email)
  return user
}

export const userModel = {
  getOne
}
