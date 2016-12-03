import Vue from 'vue'

export const signup = (telephone, name, password, email) => {
  let body = JSON.stringify({ 'telephone': telephone, 'password': password, 'name': name, 'email': email })
  return Vue.http.post('/customer/register', body)
}
