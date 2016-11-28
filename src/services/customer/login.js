import Vue from 'vue'

export const login = (telephone, password) => {
  let body = JSON.stringify({ 'telephone': telephone, 'password': password })
  return Vue.http.post('http://192.168.1.106/customer/login', body)
}
