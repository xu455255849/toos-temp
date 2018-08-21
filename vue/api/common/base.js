import { post } from '../base'

function login (payload) {
  return post('/operator/user/login', payload)
}

function logout () {
  return post('/operator/user/logout', {})
}

export default {
  login,
  logout
}
