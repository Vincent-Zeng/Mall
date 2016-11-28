import Vue from 'vue'

export const signup = (telephone, name, password) => {
  let body = JSON.stringify({ 'telephone': telephone, 'password': password, 'name': name })
  return Vue.http.post('/customer/register', body)
}
