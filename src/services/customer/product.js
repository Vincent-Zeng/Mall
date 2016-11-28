import Vue from 'vue'

export const search = (id) => {
  return Vue.http.post('/product/id', id)
}
