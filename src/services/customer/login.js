import Vue from 'vue'

export const login = (email, password) => {
  let body = JSON.stringify({ 'email': email, 'password': password })
  return Vue.http.post('/customer/login', body)
}
