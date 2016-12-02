import Vue from 'vue'

export const fetchProduct = (id) => {
  return Vue.http.get(`/product/id?id=${id}`)
}
