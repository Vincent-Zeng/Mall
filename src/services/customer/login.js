import Vue from 'vue'

export const login = (telephone, password) => {
  let body = JSON.stringify({ 'telephone': telephone, 'password': password })
  return Vue.http.post('/customer/login', body)
}
