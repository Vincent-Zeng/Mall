import Vue from 'vue'

export const search = (category, keyword) => {
  let body = JSON.stringify({ 'categoryId': category, 'keyWord': keyword })
  return Vue.http.post('/product/search', body)
}
