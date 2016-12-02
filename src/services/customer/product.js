import Vue from 'vue'

export const fetchProduct = (id) => {
  return Vue.http.post('/product/id', id)
}
