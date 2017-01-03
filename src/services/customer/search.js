import Vue from 'vue'

export const search = (category, keyword) => {
  let body = JSON.stringify({ 'categoryId': category, 'keyWord': keyword })
  if (category === 0) {
    body = JSON.stringify({ 'keyWord': keyword })
  }

  if (keyword === '') {
    body = JSON.stringify({ 'categoryId': category })
  }

  if (category === 0 && keyword === '') {
    body = JSON.stringify({
      page: 1,
      num: 10
    })
  }
  return Vue.http.post('/product/search', body)
}
